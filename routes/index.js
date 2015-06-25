var express = require('express');
var router = module.exports = express.Router();

var doVote = require('./do_vote.js');
router.route('/vote').post(doVote.post);

var listVotes = require('./list_votes.js');
router.route('/votes').post(listVotes.post);