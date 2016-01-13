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
 *
 * Lines 19-20 are for using Heroku Redis
 * If not using Heroku Redis, uncomment lines 22-23 and comment out lines 19-20
 *
 */

 if (process.env.REDIS_URL) {
   rtg = require('url').parse(process.env.REDIS_URL);

// if (process.env.REDISTOGO_URL) {
//  rtg = require('url').parse(process.env.REDISTOGO_URL);

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
   * Disable poll. The pollData var should have a field that sets the poll to inactive
   */
  disablePoll: function(pollKey, pollData, callback) {
    client.set(pollKey, pollData, function (err, reply) {
      if (err) {
        console.log(pollKey);
        console.log(pollData);
        console.log(err);
      }
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
