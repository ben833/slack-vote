/*
  This lists out current votes.
*/
var poll = {
  poolName: 'What\'s For Lunch?',
  votes: [
    { voteName: 'Chinese',
      voteCount: 12
    },
    { voteName: 'Cuban',
      voteCount: 9
    }
  ]
};

exports.post = function (req, res, next) {
  console.log('List route.');
  res.json({text: poll});
};
