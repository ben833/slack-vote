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

  // Start poll data
  pollnameText = req.body.text;
  triggerWord = req.body.trigger_word;
  pollnameText = pollnameText.replace(triggerWord + ' ','');
  poll = {'pollName': pollnameText,
    'votes': []};

  /*
   * Persist new poll to reddis
   */
  if (process.env.REDISTOGO_URL) {
    rtg = require('url').parse(process.env.REDISTOGO_URL);
    client = redis.createClient(rtg.port, rtg.hostname);
    client.auth(rtg.auth.split(':')[1]);
  } else {
    client = redis.createClient();
  }

  client.on('connect', function() {
    newPollID = 'poll' + ts;

    console.log('connected to redis');
    //console.log(poll.pollName);

    // Fetch current active poll id
    dbActions.getActivePollId(listActivePoll);
    function listActivePoll(pollId) {
      console.log('Current Active Pollid: ' + pollId);
      dbActions.getPoll(pollId, printActivePoll);
    } 

    dbActions.disablePolls(); // CLOSE THE POLL

    // Set new poll with an active poll id
    dbActions.setActivePoll(newPollID, setActivePoll);
    function setActivePoll(data) {
      //console.log('hey, the new id is: ' + newPollID + ' Im gonna go ahead and set this for ya');
      dbActions.setPoll(newPollID, poll.pollName, printNewPoll);
    }

    // Get active poll data and print results with sad 'poll is closed' note
    function printNewPoll() {
      console.log('New poll is set up with the ID: ' + newPollID);
      dbActions.getPoll(newPollID, confirmNewPoll);
    }

    function confirmNewPoll(data) {
      slackRes = 'Your poll is set up. Please start voting for ' + data;
      console.log('confirmNewPoll: Your poll is set up. Please start voting for ' + data);
      console.log('slackres: ' + slackRes);
      //slackRes = data.pollName + '\n' + "enter vote _choice_ to submit your vote";
      res.json({text: slackRes});

    }

    // Get active poll data and print results with sad 'poll is closed' note
    function printActivePoll(data) {
      slackRes = 'Closing Active Poll. Here were the results of the now-closed poll.\n'; // + tally.printPoll(JSON.parse(data));
      // console.log("in printActivePoll: " + slackRes);
    }


  });

};
