var data = require('./../data.js')
  , tally = require('./../tally.js')
  , returnText = '';

exports.post = function (req, res, next) {

  console.log('Close poll.');
  data.status = 0;
  returnText = "The poll is now closed. \n" + tally.printPoll(data);
  res.json({text: returnText});

};
