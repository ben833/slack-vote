var data = require('./../data.js');
var tally = require('./../tally.js');

exports.post = function (req, res, next) {
    var returnText = "";
    console.log('Close poll.');

    data.status = 0;
    

    returnText = "The poll is now closed. \n" + tally.printPoll(data);


    res.json({text: returnText});
};

// show votes
// disallow new votes

