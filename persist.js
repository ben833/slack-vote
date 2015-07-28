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
 * Set correct environment for redis
 */
if (process.env.REDISTOGO_URL) {
  rtg = require('url').parse(process.env.REDISTOGO_URL);
  client = redis.createClient(rtg.port, rtg.hostname);
  client.auth(rtg.auth.split(':')[1]);
} else {
  client = redis.createClient();
}

var dbActions = {
  // Set active poll id
  setActivePoll: function(pollKey, callback) {
    client.set('activePoll', pollKey, function (err, reply) {
      if (reply) {
        callback(reply);
      }
    });
  },
  // Get active poll id
  getActivePollId: function(callback) {
    client.get('activePoll', function (err, reply) {
      if (reply) {
        callback(reply);
      }
    });
  },
  // Set poll data
  setPoll: function(pollKey, pollData, callback) {
    client.set(pollKey, pollData, function (err, reply) {
      if (reply) {
        callback(reply);
      }
    });
  },
  disablePolls: function() {
    client.set('activePoll', null, function (err, reply) {
      //console.log("in disable polls: " + reply);
    });
  },
  // Get poll from id
  getPoll: function(pollId, callback) {
    client.get(pollId, function (err, reply) {
      //console.log('fetching poll for you, id: ' + pollId);
      if (reply) {
        //console.log('this get should not just be OK: ' + reply.toString());
        callback(reply);
      }
    });
  }
};

module.exports = dbActions;
