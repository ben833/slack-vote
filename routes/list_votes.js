/*
  this file lists out votes
  
*/


exports.get = function (request, response, next) {
    response.json({text: "votes"});
};