# slack-vote
A voting bot created with Node

Slack users will be able to send a message to @vote-bot with their vote. For example: 
```
@vote-bot: vote pizza
```

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

To run this in terminal:
```
node server.js
```

To test this in terminal:
```
mocha test
```
