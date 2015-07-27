var data = require('./../data.js')
  , _ = require('underscore')
  , tally = require('./../tally.js')
  , slackRes = ''
  , pollResults = ''
  , voteText = ''
  , triggerWord = ''
  , formattedVoteName = ''
  , lastIndexOfSeparator = 0
  , voteMatch = false;

// TODO GET ACTIVE POLL

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

  // TODO SET ACTIVE POLL WITH NEW RESULTS

  slackRes = tally.printPoll(data);
  voteMatch = false;

  res.json({text: slackRes});
};
