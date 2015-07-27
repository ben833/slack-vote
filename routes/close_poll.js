var data = require('./../data.js')
  , tally = require('./../tally.js')
  , returnText = '';

exports.post = function (req, res, next) {

  console.log('Close poll.');
  data.status = 0;
  // TODO SET ACTIVE POLL TO NULL
  // PRINT FINAL RESULTS
  returnText = "The poll is now closed. \n" + tally.printPoll(data);
  res.json({text: returnText});

};
