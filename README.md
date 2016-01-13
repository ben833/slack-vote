<div align="center"><img src="http://i.imgur.com/zmvMFDO.png"/><br><br><img src="http://i.imgur.com/GU4eE21.gif"/></div><h4>Q: What is slack-vote?<br>A: A voting bot for Slack created with Node, with easy deployment to Heroku</h2><br>

With slack-vote, slack users can now start a poll and vote in a slack channel. Using the Slack API's Outgoing Integrations, users are able to enter these commands in the room:
```
start poll What's for Lunch?
```
This allows voting to begin. People can then "write in" a choice by voting for an item. Other people can vote for the same phrase (case insensitive).
```
vote pizza
```
If there is not already a vote for Pizza, a new option for Pizza is created. If there already is a vote for Pizza, this increments the tally for Pizza.

The bot will then respond with the results of the vote so far:
```
Current Poll: What's for Lunch?
Results:
Chinese: 5
Indian: 4
Pizza: 2
Greek: 1
```

At the end of the voting session, someone is able to close the poll by entering this in the channel:
```
close poll
```

---
# Setup

Getting slack-vote to work properly depends on two key components: the slack integrations and the back-end server. Using Heroku for the back-end is free, reliable, and easy to setup.

### Heroku Setup
Note: You *must* have a credit card on file to use [Heroku Redis](https://elements.heroku.com/addons/heroku-redis) (the most basic usage plan is free). 

* Create a new Heroku app
* Add the free [Heroku Redis add-on](https://elements.heroku.com/addons/heroku-redis) to this app
* Deploy the code from this slack-vote repo to Heroku
* If the server is running properly, when you visit the address with a browser it should say `Alive and well.` in plain text.

### Slack Integration
Once the server is up and running, you need to add to your organization's custom integrations. These can be found at https://my.slack.com/apps/manage/custom-integrations 

You'll need to add three outgoing webhook configurations:
* your-slackvote-app.herokuapp.com/start
* your-slackvote-app.herokuapp.com/vote
* your-slackvote-app.herokuapp.com/close

For each of these webhooks, you'll need to add a trigger word. The above usage example uses these three trigger words for each of the respective webhooks:
* start poll
* vote
* close poll

You'll also have to choose your own image and bot name to appear when the server responses are published in your Slack channels. For consistency's sake, it makes sense to use the same image and bot name for each of the three webhook configurations.

That's it! You should now have the voting system up and running!

Note: You can customize the server's JSON responses to include slack text formatting such as `*bold*` and `_italics_` as well as any custom animated emojis your organization might have. Slack will parse the server text response as a normal slack text entry.

##If you don't plan on using Heroku

* Comment out and un-comment the appropriate lines in `persist.js` (see line 12)
* Install Node.js: https://nodejs.org/en/download/
* In the terminal, run `sudo npm install`
* Install Redis: http://redis.io/topics/quickstart
* You should be ready to run this directly from the terminal

To run this from a terminal for the first time:
```
redis-server
export NODE_ENV=development
node server.js
```
After that first run, you can simply type:
```
node server.js
```

To test this in terminal:
```
npm test
```
