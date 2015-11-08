var poll = ''
  , dbActions = require('./../persist.js')
  , tally = require('./../tally.js')
  , activePoll = ''
  , redis = require('redis')
  , pollnameText = ''
  , triggerWord = ''
  , channelId = ''
  , pollnameText = ''
  , slackRes = ''
  , rtg = ''
  , newPollID = ''
  , ts = Math.floor(Date.now() / 1000);

exports.post = function(req, res, next) {

  console.log('Start vote route.');

  /*
   * Start poll data.
   */
  pollnameText = req.body.text;
  triggerWord = req.body.trigger_word;
  channelId = req.body.channel_id;
  pollnameText = pollnameText.replace(triggerWord + ' ','');
  poll = {
    'pollName': pollnameText,
    'active': 1,
    'answers': []
  };

  newPollID = 'activePoll_' + channelId;

  /*
   * Fetch and print current active poll.
   */
  dbActions.getPoll(newPollID, listActivePoll);
  function listActivePoll(data) {
    console.log('Current Active Poll: ' + data);
    if (data === null) {
      console.log('There is no current active poll, setting up new poll.');
    } else {
      console.log('Current poll is closing.');
      slackRes = 'Closing Active Poll. Here were the results of the now-closed poll.\n' + tally.printPoll(JSON.parse(data)) + '\n';
    }
  }

  /*
   * Set new poll with the active poll id.
   * Print confirmation and vote message.
   */
  console.log('Setting up new poll with ID: ' + newPollID);
  dbActions.setPoll(newPollID, JSON.stringify(poll), printNewPoll);

  function printNewPoll() {
    console.log('New poll is set up with the ID: ' + newPollID);
    dbActions.getPoll(newPollID, confirmNewPoll);
  }

  function confirmNewPoll(data) {
    slackRes += '\nYour poll is set up. Please start voting for ' + tally.printPoll(JSON.parse(data));
    res.json({text: slackRes});
  }

};
