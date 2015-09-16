var redis = require('redis')
  , pollnameText = ''
  , triggerWord = ''
  , pollnameText = ''
  , slackRes = ''
  , client = ''
  , rtg = ''
  , operationComplete = false
  , ts = Math.floor(Date.now() / 1000);

/*
 * Set correct environment for redis.
 */
if (process.env.REDISTOGO_URL) {
  rtg = require('url').parse(process.env.REDISTOGO_URL);
  client = redis.createClient(rtg.port, rtg.hostname);
  client.auth(rtg.auth.split(':')[1]);
} else {
  client = redis.createClient();
}

/*
 * TBD: there should be error handling on all of these to handle no reply responses.
 */
var dbActions = {
  /*
   * Set poll data.
   */
  setPoll: function(pollKey, pollData, callback) {
    client.set(pollKey, pollData, function (err, reply) {
      if (reply) {
        callback(reply);
      }
    });
  },
  /*
   * Disable all polls.
   */
  disablePolls: function(callback) {
    client.set('activePoll', '', function (err, reply) {
      if (reply) {
        callback(reply);
      }
    });
  },
  /*
   * Get poll from id.
   */
  getPoll: function(pollId, callback) {
    client.get(pollId, function (err, reply) {
      if (reply) {
        callback(reply);
      } else {
        callback(null);
      }
    });
  }
};

module.exports = dbActions;
