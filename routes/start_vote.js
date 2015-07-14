var data = require('./../data.js');
var redis = require('redis');

exports.post = function (req, res, next) {
    console.log('List route.');
    pollnameText = req.body.text;
    triggerWord = req.body.trigger_word;
    pollnameText = pollnameText.replace(triggerWord + ' ','');

    console.log('start poll ' + pollnameText);

    data.pollName = pollnameText;
    data.votes = [];
    data.status = 1;

    console.log("data object:", data)

    slackRes = data.pollName + '\n' + "enter vote _choice_ to submit your vote";
    res.json({text: slackRes});

    var r = redis.createClient();
    ts = Math.floor(Date.now() / 1000)
    r.set('key' + ts, JSON.stringify(data) );
    console.log('saved data');
};
