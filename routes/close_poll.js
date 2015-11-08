var data = ''
  , tally = require('./../tally.js')
  , returnText = ''
  , slackRes = ''
  , poll = ''
  , dbActions = require('./../persist.js')
  , channelId = '';

exports.post = function (req, res, next) {
  /*
   * Get poll data.
   */
  triggerWord = req.body.trigger_word;
  channelId = req.body.channel_id;
  pollId = 'activePoll_' + channelId;

  console.log('About to close the poll for pollId: ' + pollId);
  dbActions.getPoll(pollId, setData);
  function setData(poll_string) {
    if (poll_string) {
      data = JSON.parse(poll_string);

      // disallow more voting but save the data to keep some kind of an archive
      data.active = 0;

      closePoll(data);
    }
  }

  /*
   * Print active poll
   */
  function closePoll(data) {
    slackRes = 'Closing active poll. Here are the final results\n ' + tally.printPoll(data);
    console.log('closePoll: ' + slackRes);
    dbActions.disablePoll(pollId, JSON.stringify(data), confirmClosePoll);
  }
  function confirmClosePoll(data) {
    console.log('confirmClosePoll: ' + slackRes);
    res.json({text: slackRes});
  }
};
