# slack-vote
A voting bot created with Node

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
