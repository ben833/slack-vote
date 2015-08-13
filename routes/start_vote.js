var poll = ''
  , dbActions = require('./../persist.js')
  , tally = require('./../tally.js')
  , activePoll = ''
  , redis = require('redis')
  , pollnameText = ''
  , triggerWord = ''
  , pollnameText = ''
  , slackRes = ''
  , client = ''
  , rtg = ''
  , newPollID = ''
  , ts = Math.floor(Date.now() / 1000);

exports.post = function (req, res, next) {

  console.log('Start vote route.');

  /*
   * Start poll data.
   */
  pollnameText = req.body.text;
  triggerWord = req.body.trigger_word;
  pollnameText = pollnameText.replace(triggerWord + ' ','');
  poll = {
    'pollName': pollnameText,
    'votes': []
  };

  /*
   * Persist new poll to reddis.
   */
  if (process.env.REDISTOGO_URL) {
    rtg = require('url').parse(process.env.REDISTOGO_URL);
    client = redis.createClient(rtg.port, rtg.hostname);
    client.auth(rtg.auth.split(':')[1]);
  } else {
    client = redis.createClient();
  }

  client.on('connect', function() {

    console.log('connected to redis');
    newPollID = 'poll' + ts;

    /*
     * Fetch and print current active poll.
     */
    dbActions.getActivePollId(listActivePoll);
    function listActivePoll(pollId) {
      console.log('Current Active Pollid: ' + pollId);
      if (pollId === null) {
        console.log('There is no current active poll, setting up new poll.');
      } else {
        console.log('Current poll is closing.');
        dbActions.getPoll(pollId, printActivePoll);
      }
    }
    function printActivePoll(data) {
      slackRes = 'Closing Active Poll. Here were the results of the now-closed poll.\n' + tally.printPoll(JSON.parse(data)) + '\n';
    }

    /*
     * Set new poll with the active poll id.
     * Print confirmation and vote message.
     */
    dbActions.setActivePoll(newPollID, setActivePoll);
    function setActivePoll() {
      console.log('Setting up new poll with ID: ' + newPollID);
      dbActions.setPoll(newPollID, JSON.stringify(poll), printNewPoll);
    }
    function printNewPoll() {
      console.log('New poll is set up with the ID: ' + newPollID);
      dbActions.getPoll(newPollID, confirmNewPoll);
    }
    function confirmNewPoll(data) {
      slackRes += '\nYour poll is set up. Please start voting for ' + tally.printPoll(JSON.parse(data));
      console.log('confirmNewPoll: ' + slackRes);
      res.json({text: slackRes});
    }

  });

};
