var data = require('./../data.js')
  , _ = require('underscore')
  , slackRes = ''
  , pollResults = ''
  , voteText = ''
  , triggerWord = ''
  , formattedVoteName = ''
  , voteMatch = false;

function printPoll(data) {
  pollResults = 'Thanks for voting on: ' + data.poolName + '. ';
  pollResults += 'Current Results: \n';
  _.each(data.votes, function(vote) {
    formattedVoteName = vote.voteName.capitalizeFirstLetter();
    pollResults += formattedVoteName + ': ' + vote.voteCount + ', ';
  });
  return pollResults;
};

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

/*
  Handle voting actions
*/
exports.post = function (req, res, next) {

  voteText = req.body.text;
  triggerWord = req.body.trigger_word;
  voteText = voteText.replace(triggerWord + ' ','').toLowerCase();

  console.log('Incoming vote for: ' + voteText);

  var count = 0;
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

  slackRes = printPoll(data);
  voteMatch = false;

  res.json({text: slackRes});
};
