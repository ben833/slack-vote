var data = require('./../data.js')
  , pollnameText = ''
  , triggerWord = ''
  , pollnameText = ''
  , slackRes = '';

exports.post = function (req, res, next) {

  console.log('List route.');

  pollnameText = req.body.text;
  triggerWord = req.body.trigger_word;
  pollnameText = pollnameText.replace(triggerWord + ' ','');

  console.log('start poll ' + pollnameText);

  data.pollName = pollnameText;
  data.votes = [];
  data.status = 1;

  console.log('Data object:', data)

  slackRes = data.pollName + '\n' + "enter vote _choice_ to submit your vote";
  res.json({text: slackRes});

};
