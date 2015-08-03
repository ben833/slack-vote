var poll = ''
  , _ = require('underscore')
  , dbActions = require('./../persist.js')
  , tally = require('./../tally.js')
  , redis = require('redis')
  , activePoll = ''
  , slackRes = ''
  , pollResults = ''
  , voteText = ''
  , triggerWord = ''
  , formattedVoteName = ''
  , lastIndexOfSeparator = 0
  , data = undefined
  , voteMatch = false;


/*
  Capitalize the first letter of each word
*/
String.prototype.capitalizeFirstLetter = function() {
  var pieces = this.split(" ");
  for (var i = 0; i < pieces.length; i++) {
    var j = pieces[i].charAt(0).toUpperCase();
    pieces[i] = j + pieces[i].substr(1);
  }
  return pieces.join(" ");
}

/*
  Handle voting actions
*/
exports.post = function (req, res, next) {

  voteText = req.body.text;
  triggerWord = req.body.trigger_word;
  voteText = voteText.replace(triggerWord + ' ','').toLowerCase();
  console.log('Incoming vote for: ' + voteText);

  dbActions.getActivePollId(getActivePoll);
  function getActivePoll(pollId) {
    console.log('Current Active Pollid: ' + pollId);
    dbActions.getPoll(pollId, setData);
    activePoll = pollId
  }

  function setData(poll_string) {
    var pollTitleOnly = false;
    try{
        data = JSON.parse(poll_string);
    } catch (err) {
        if (err && (err.name == 'SyntaxError')){
          // if active poll is not json parse-able, assume it's just the poll title
          pollTitleOnly = true;
        } else {
          throw err;
        }
    }
    console.log('poll prior to vote: ' + poll_string);
    if (pollTitleOnly){
      pollnameText = poll_string;
      poll =  {
        pollName: pollnameText,
        status: 1,
        votes: [{
          voteName: voteText,
          voteCount: 1,
        }]
      };
      data = poll;
    } else {
      _.each(data.votes, function(vote) {
        if (voteText === vote.voteName) {
          console.log('vote name matched!');
          vote.voteCount = vote.voteCount + 1;
          voteMatch = true;
        }
      });
      if (!voteMatch) {
        console.log('No match, creating new poll option for: ' + voteText);
        newVote = {
          voteName: voteText,
          voteCount: 1
        };
      data.votes.push(newVote);
      }
    }
    dbActions.setPoll(activePoll, JSON.stringify(data), handleResults);
  }

  function handleResults(poll) {
    slackRes = tally.printPoll(data);
    voteMatch = false;

    res.json({text: slackRes});
  }

};
