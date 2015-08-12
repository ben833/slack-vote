var data = ''
  , tally = require('./../tally.js')
  , returnText = ''
  , slackRes = ''
  , poll = ''
  , dbActions = require('./../persist.js');

exports.post = function (req, res, next) {

  console.log('Close poll route.');

  /*
   * Print active poll and set activePoll to null
   */
  dbActions.getActivePollId(fetchActivePoll);
  function fetchActivePoll(pollId) {
    console.log('Fetching active poll: ' + pollId);
    dbActions.getPoll(pollId, closePoll);
  }
  function closePoll(data) {
    slackRes = 'Closing active poll. Here are the final results\n ' + tally.printPoll(JSON.parse(data));
    console.log('closePoll: ' + slackRes);
    dbActions.disablePolls(confirmClosePoll);
  }
  function confirmClosePoll(data) {
    console.log('confirmClosePoll: ' + slackRes);
    res.json({text: slackRes});
  }

};
