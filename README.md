# slack-vote
A voting bot created with Node

Slack users will be able to start a poll and vote in a slack channel, using Outgoing Integrations. Users will be able to enter these commands in the room:
```
start poll What's for Lunch?
```
```
options "Chinese" "Indian" "South African"
```
This allows voting to begin and gives people an initial set of choices. People can "write in" a choice by voting for an item not in the initial list.

```
vote pizza
```
This increments the tally for Pizza. The input should be processed in a case-insensitive way.

The bot will then respond with the results of the vote so far:
```
vote-bot    2:49pm

Your vote has been recorded: pizza
The tally is:
Chinese 5
Indian 4
Pizza 2
Greek 1
```

At the end of the voting session, someone will be able to close the poll by entering this in the channel:
```
close poll
```

To run this in terminal:
```
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

# Local Development
* Install node
* `sudo npm install`
* Install redis locally - instructions here http://redis.io/topics/quickstart
* To start redis, on the command line - `redis-server`

