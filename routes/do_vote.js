var poll = ''
  , _ = require('underscore')
  , dbActions = require('./../persist.js')
  , tally = require('./../tally.js')
  , redis = require('redis')
  , activePoll = ''
  , slackRes = ''
  , pollResults = ''
  , answerText = ''
  , userName = ''
  , userID = ''
  , timestamp = ''
  , channelID = ''
  , triggerWord = ''
  , data = undefined
  , answerMatch = false;

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

  triggerWord = req.body.trigger_word;
  answerText = req.body.text;
  answerText = answerText.replace(triggerWord + ' ','').toLowerCase();
  userName = req.body.user_name;
  userID = req.body.user_id;
  timestamp = req.body.timestamp;
  pollId = 'activePoll_' + req.body.channel_id;

  postedVote = {
    'userName': userName,
    'userID': userID,
    'timestamp': timestamp
  };

  console.log('Incoming post. Answer text: ' + answerText + '. pollId: ' + pollId + '\n');

  dbActions.getPoll(pollId, setData);
  function setData(poll_string) {
    console.log('Poll prior to submission: ' + poll_string);
    if (poll_string) {
      data = JSON.parse(poll_string);
      if (data.active == 1) {
        _.each(data.answers, function(answer) {
          if (answerText === answer.answerName) {
            // there is a votes array already, because this isn't the first vote
            answer.votes.push(postedVote);
            answerMatch = true;
          }
        });

        if (!answerMatch) {
          console.log('No poll answer match, creating new poll answer for: ' + answerText);
          newAnswer = {
            answerName: answerText,
            votes: new Array(postedVote)
          };
          data.answers.push(newAnswer);
          console.log('Poll after submission: ' + poll_string);
        }
        answerMatch = false; // not sure why this is here - ben833
        dbActions.setPoll(pollId, JSON.stringify(data), handleResults);
        dbActions.getPoll(pollId, function(result_string){console.log('Poll after submission: ' + result_string);});
      }
      else {
        data = {
          'pollName': 'There is no active poll set for this channel, please use the "start poll QUESTION" command to start a new poll',
          'answers': []
        };
        handleResults();
      }
    }
  }

  function handleResults() {
    slackRes = tally.printPoll(data);
    res.json({text: slackRes});
  }
};
