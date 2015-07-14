var data = require('./../data.js')
  , redis = require('redis')
  , pollnameText = ''
  , triggerWord = ''
  , pollnameText = ''
  , slackRes = ''
  , client = ''
  , rtg = ''
  , ts = Math.floor(Date.now() / 1000);

exports.post = function (req, res, next) {

  console.log('List route.');

  pollnameText = req.body.text;
  triggerWord = req.body.trigger_word;
  pollnameText = pollnameText.replace(triggerWord + ' ','');
  data.pollName = pollnameText;
  data.votes = [];
  data.status = 1;
  console.log('start poll ' + pollnameText);

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
    client.set('key' + ts, JSON.stringify(data));
    console.log('saved new poll data');
  });

  slackRes = data.pollName + '\n' + "enter vote _choice_ to submit your vote";
  res.json({text: slackRes});

};
