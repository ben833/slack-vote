var slackbot = require('node-slackbot');

var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('config.json', 'utf8'));

console.log("the key is: " + obj.api_key);
/*
var bot = new slackbot(obj.api_key);

require("./do_vote.js");
require("./list_votes.js");

*/
