/*
  This lists out current votes.
*/
var data = require('./../data.js');

exports.get = function (req, res, next) {
  console.log('List route.');
  res.json({text: data});
};
