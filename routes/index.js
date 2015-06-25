var express = require('express')
	, router = module.exports = express.Router()
  , doVote = require('./do_vote.js')
  , listVotes = require('./list_votes.js');

router.route('/vote').post(doVote.post);
router.route('/votes').get(listVotes.get);
