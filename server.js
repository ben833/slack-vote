var express = require('express')
  , bodyParser = require('body-parser')
  , server = module.exports = express()
  , router = require('./routes/index.js')
  //, underscore_ = require('underscore');


server.use( bodyParser.json( ) );
server.use( bodyParser.urlencoded( {extended: false} ) );
server.use( router );
server.use(function (request, response) {
    response.status(200).send("Alive and well.")
});

var port = process.env.port || process.env.PORT || 80;
server.set('port',port);
var hostname = process.env.hostname || "localhost";

server.on('error', function (error) {
  console.log(error);
  //we'll handle error here after adding cluster option.
});

server.listen(3000, hostname, function () {
  console.log('Up and running on port ' + port + " for " + hostname);
});