// Const declaration
const Discord = require('discord.js');
const Sjs = require('@quentingruber/simple-json');
const simpleGit = require('simple-git')("./");
const client = new Discord.Client();


GetTriggers = function () {  // load data from Triggers.json
  return Sjs.extract('Triggers.json');
}

GetConfig = function () { // load data from logininfo.json
  return (Sjs.extract('Config.json'));
}

UpdateBot = function () {
  try {
    if (simpleGit.pull()) {
      Triggers_list = GetTriggers();
      Triggers_keys = Object.keys(Triggers_list);
      Triggers_values = Object.values(Triggers_list);
      BanChanel_list = GetConfig().ChanelBan_list

      console.log("Successfully pull info from github repo")
    }
  }
  catch (e) {
    console.log(e)
    return 0
  }
  return 1
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  var TimeBetweenUpdt = GetConfig().TimeBetweenUpdt
  if (TimeBetweenUpdt != 0) { // disable update if TimeBetweenUpdt == 0
    if (!UpdateBot()) {
      console.log("Bot not updated")
      Triggers_list = GetTriggers();
      Triggers_keys = Object.keys(Triggers_list);
      Triggers_values = Object.values(Triggers_list);
      BanChanel_list = GetConfig().ChanelBan_list
    }
    UpdateInterval = setInterval(UpdateBot, TimeBetweenUpdt * 1000)
  }
  else { // if update is disable
    console.log("Update disable !")
    Triggers_list = GetTriggers();
    Triggers_keys = Object.keys(Triggers_list);
    Triggers_values = Object.values(Triggers_list);
    BanChanel_list = GetConfig().ChanelBan_list
  }
});

client.on('message', msg => {
  // when the bot see a msg

  if (!BanChanel_list.includes(msg.channel.id)) {

    var Current_trigger = 0;

    Triggers_keys.forEach(Trigger => {  // for each trigger 
      if (msg.content.toLowerCase().includes(Trigger) && !msg.author.bot) {  // check if the new msg is a trigger


        // init flag
        var IsPrivateMsg = false;

        // if the trigger answer is a simple string
        if (typeof (Triggers_values[Current_trigger]) == typeof ("")) {
          msg.reply(Triggers_values[Current_trigger]);
        }


        // if is an object

        if (typeof (Triggers_values[Current_trigger]) == typeof ({ a: 1 })) {

          // get object length
          var Trigger_length = Object.keys(Triggers_values[Current_trigger]).length

          // check every value in the object to find flag
          for (var i = 0; i < Trigger_length; i++) {
            if (Triggers_values[Current_trigger][i] == "Pmsg") {
              IsPrivateMsg = true;
            }
          }

          if (IsPrivateMsg) {  // if has the private message flag
            for (var i = 0; i < Object(Triggers_values[Current_trigger][0]).length; i++) {
              msg.author.send(Triggers_values[Current_trigger][0]);
            }
          }
          else { // if is a standard message
            for (var i = 0; i < Trigger_length; i++) {
              msg.reply(Triggers_values[Current_trigger][i]);
            }
          }

        }

      }
      Current_trigger += 1
    });
  }
});

client.login(GetConfig().Token);

