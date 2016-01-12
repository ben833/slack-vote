# slack-vote
A voting bot created with Node, with easy deployment to Heroku

Slack users can now start a poll and vote in a slack channel, using the Slack API, specifically Outgoing Integrations. Users are able to enter these commands in the room:
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
vote-bot    2:49pm

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
## Developer Documentation

To run this in terminal:
```
redis-server
export NODE_ENV=development
node server.js
```
After the first run, you can simply run
```
node server.js
```


To test this in terminal:
```
npm test
```

### Local Development Setup
* Install node
* `sudo npm install`
* Install redis locally - instructions here http://redis.io/topics/quickstart
* See "To run this in terminal" above

## Heroku Setup
If using Heroku, you must have a credit card on file to use [Heroku Redis](https://elements.heroku.com/addons/heroku-redis) (the most basic usage plan is free). 

* Create a new Heroku app
* Add the free [Heroku Redis add-on](https://elements.heroku.com/addons/heroku-redis) to this app
* Comment and un-comment out the appropriate lines in `persist.js` (see line 12) for Heroku Redis to operate
* Deploy to heroku
* If the server is running properly, when you visit the address with a browser, it should say `Alive and well.` in plain text.

## Slack Integration
Once the server is up and running, you need to add to your organization's custom integrations. These can be found at https://my.slack.com/apps/manage/custom-integrations 

You'll need to add three outgoing webhook configurations:
* your-slackvote-app.herokuapp.com/start
* your-slackvote-app.herokuapp.com/vote
* your-slackvote-app.herokuapp.com/close

For each of these webhooks, you'll need to add a trigger word. The above usage example uses these three trigger words for each of the respective webhooks:
* start poll
* vote
* close poll

That's it! You should now have the voting system up and running!

Note: You can customize the server's JSON responses to include slack text formatting such as `*bold*` and `_italics_` as well as any custom animated emojis your organization might have. Slack will parse the server text response as a normal slack text entry.

