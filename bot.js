const Discord = require('discord.js');
const client = new Discord.Client();

 

client.on('ready', () => {

    console.log('I am ready!');

});

 

client.on('message', message => {

    if (message.content === 'ping') {

       message.reply('pong');

       }

});

 

// THIS  MUST  BE  THIS  WAY
console.log(process.env.BOT_TOKEN);

client.login('UGrx7y6gHVZC2TcW3Kf4nYeFAU7YT7I-');//BOT_TOKEN is the Client Secret
