var poll = ''
  , _ = require('underscore')
  , dbActions = require('./../persist.js')
  , tally = require('./../tally.js')
  , redis = require('redis')
  , activePoll = ''
  , slackRes = ''
  , pollResults = ''
  , voteText = ''
  , channelID = ''
  , triggerWord = ''
  , data = undefined
  , voteMatch = false;

/*
 * Capitalize the first letter of each word.
 */
String.prototype.capitalizeFirstLetter = function() {
  var pieces = this.split(' ');
  for (var i = 0; i < pieces.length; i++) {
    var j = pieces[i].charAt(0).toUpperCase();
    pieces[i] = j + pieces[i].substr(1);
  }
  return pieces.join(' ');
};

/*
 * Handle voting actions.
 */
exports.post = function (req, res, next) {

  voteText = req.body.text;
  triggerWord = req.body.trigger_word;
  voteText = voteText.replace(triggerWord + ' ','').toLowerCase();
  pollId = 'activePoll_' + req.body.channel_id;
  console.log('Incoming vote for: ' + voteText + '. pollId: ' + pollId + '\n');

  dbActions.getPoll(pollId, setData);
  function setData(poll_string) {
    console.log('Poll prior to vote: ' + poll_string);
    if (poll_string) {
      data = JSON.parse(poll_string);
      _.each(data.votes, function(vote) {
        if (voteText === vote.voteName) {
          console.log('Vote name match.');
          vote.voteCount = vote.voteCount + 1;
          voteMatch = true;
        }
      });
      if (!voteMatch) {
        console.log('No poll option match, creating new poll option for: ' + voteText);
        newVote = {
          voteName: voteText,
          voteCount: 1
        };
        data.votes.push(newVote);
      }
      voteMatch = false;
      dbActions.setPoll(pollId, JSON.stringify(data), handleResults);
    } else {
      data = {
        'pollName': 'There is no active poll set for this channel, please use the "start" command to start a new poll',
        'votes': []
      };
      handleResults();
    }
  }

  function handleResults() {
    slackRes = tally.printPoll(data);
    res.json({text: slackRes});
  }

};
