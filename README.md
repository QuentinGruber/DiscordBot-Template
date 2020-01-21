# Installation

* Fork this repository

* Clone the forked repository 

* Install Node (Node <= v8.13)

* `npm install` to install package dependencies

* `npm start`


# How to use

## Token 

[Create Discord Bot](https://github.com/QuentinGruber/Gitord/wiki/Create-your-discord-bot)

Put your discord bot token in **loginfo.json**

## Triggers

List all your triggers in **Triggers.json**


Simple answer exemple:

`"Trigger":"text"`

multiple answer exemple:

`"Trigger":["text","text2"]`

Private message answer exemple:

`Trigger":[["text"],["Pmsg"]]`


# Update

If you set a "TimeBetweenUpdt" (in ms) in config.json , your bot will fetch update from his Github repository


# Flag

* Pmsg = private message
