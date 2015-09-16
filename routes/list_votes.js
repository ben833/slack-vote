var data = ''
  , tally = require('./../tally.js')
  , returnText = ''
  , slackRes = ''
  , poll = ''
  , dbActions = require('./../persist.js')

exports.post = function (req, res, next) {

  console.log('List results of current poll.');

  /*
   * Print active poll results.
   * TBD: Needs to be refactored if we want to use this route
   */
  // dbActions.getActivePollId(fetchActivePoll);
  // function fetchActivePoll(pollId) {
  //   console.log('Fetching active poll: ' + pollId);
  //   dbActions.getPoll(pollId, printPoll);
  // }
  // function printPoll(data) {
  //   slackRes = 'Here are the current votes: \n ' + tally.printPoll(JSON.parse(data));
  //   console.log('printPoll: ' + slackRes);
  //   res.json({text: slackRes});
  // }

};
