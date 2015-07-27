var data = ''
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
  , ts = Math.floor(Date.now() / 1000);

exports.post = function (req, res, next) {

  console.log('Start vote route.');

  // Start poll data
  pollnameText = req.body.text;
  triggerWord = req.body.trigger_word;
  pollnameText = pollnameText.replace(triggerWord + ' ','');
  data.pollName = pollnameText;
  data.votes = [];

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

    console.log('connected to reddis');

    // Fetch current active poll id
    dbActions.getActivePollId(listActivePoll);
    function listActivePoll(pollId) {
      console.log('We got the active poll from callback! Pollid: ' + pollId);
      dbActions.getPoll(pollId, printActivePoll);
    }

    // Get active poll data and print results with sad 'poll is closed' note
    function printActivePoll(data) {
      slackRes = 'Closing Active Poll, Here are the results.\n' + tally.printPoll(JSON.parse(data));
      console.log(slackRes);
    }

    // Set active poll id
    dbActions.setActivePoll('poll' + ts, setActivePoll);
    function setActivePoll(data) {
      console.log('hey, the new id is: ' + 'poll' + ts + ' Im gonna go ahead and set this for ya');
      dbActions.setPoll('poll' + ts, JSON.stringify(data), printNewPoll);
    }

    // Get active poll data and print results with sad 'poll is closed' note
    function printNewPoll() {
      console.log('oh hai hans');
      console.log('hey, the new id is: ' + 'poll' + ts);
      dbActions.getPoll('poll' + ts, noSeriouslyPrintThisNoise);
    }

    function noSeriouslyPrintThisNoise(data) {
      console.log('oh hans, so much nesting: ' + data);
    }

  });

  console.log('slackres: ' + slackRes);
  //slackRes = data.pollName + '\n' + "enter vote _choice_ to submit your vote";
  res.json({text: slackRes});

};
