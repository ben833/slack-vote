# slack-vote
A voting bot created with Node

Slack users will be able to start a poll and vote in a slack channel, using Outgoing Integrations. Users will be able to enter these commands in the room: 
```
start poll "Chinese" "Pizza" "Indian" "Tex Mex"
vote pizza
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

At the end of the voting session, someone will be able to close the poll by entering this in the channel:
```
close poll
```

To run this in terminal:
```
node server.js
```

To test this in terminal:
```
npm test
```
