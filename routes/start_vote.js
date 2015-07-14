var data = require('./../data.js');

exports.post = function (req, res, next) {
    console.log('List route.');
    res.json({text: data.pollName});
};
