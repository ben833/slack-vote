var slackbot = require('node-slackbot');

var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('config.json', 'utf8'));

var bot = new slackbot('token_goes_here');

require("./do_vote.js");
require("./list_votes.js");

