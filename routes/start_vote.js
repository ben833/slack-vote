var data = require('./../data.js');
var redis = require('redis');

exports.post = function (req, res, next) {
    console.log('List route.');
    var r = redis.createClient();
    r.set('three', 'stringystring' );
    console.log('saved data');
};
