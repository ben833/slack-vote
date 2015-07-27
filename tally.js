_ = require('underscore');

var tally = {

  printPoll: function(data) {

    // the string that separates poll items when printing
    separator = ' \n';

    // build the output
    pollResults = 'Thanks for voting on: ' + data.pollName + ' ';
    pollResults += '\nResults: \n';
    _.each(data.votes, function(vote) {
      formattedVoteName = vote.voteName.capitalizeFirstLetter();
      pollResults += formattedVoteName + ': ' + vote.voteCount + separator;
    });

    // Remove the last separator (newline) to avoid extra empty line
    lastIndexOfSeparator = pollResults.lastIndexOf(separator);
    if (lastIndexOfSeparator > separator.length) {
      pollResults = pollResults.substring(0, lastIndexOfSeparator);
    }
    return pollResults;
  }
};

module.exports = tally;
