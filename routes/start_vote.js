var data = require('./../data.js');

exports.post = function (req, res, next) {
    console.log('List route.');
    res.json({text: "Thanks, I am deploy on commit to master."});
};
