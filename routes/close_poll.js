var data = ''
  , tally = require('./../tally.js')
  , returnText = ''
  , slackRes = ''
  , poll = ''
  , dbActions = require('./../persist.js')
  , channelId = '';

exports.post = function (req, res, next) {

  console.log('Close poll route.');
  channelId = 'activePoll_' + req.body.channel_id;

  /*
   * Print active poll and set activePoll to null
   * TBD: Needs to be refactored if we want to use this route
   */
  // dbActions.getActivePollId(channelId);
  // function fetchActivePoll(pollId) {
  //   console.log('Fetching active poll: ' + pollId);
  //   dbActions.getPoll(pollId, closePoll);
  // }
  // function closePoll(data) {
  //   slackRes = 'Closing active poll. Here are the final results\n ' + tally.printPoll(JSON.parse(data));
  //   console.log('closePoll: ' + slackRes);
  //   dbActions.disablePolls(confirmClosePoll);
  // }
  // function confirmClosePoll(data) {
  //   console.log('confirmClosePoll: ' + slackRes);
  //   res.json({text: slackRes});
  // }

};
