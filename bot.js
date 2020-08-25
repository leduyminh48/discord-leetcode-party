const Discord = require('discord.js');
const companyBot = require('./bots/company')
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', (message) => {
    if (message.content === 'ping') {
        message.reply('pong')
    }

    companyBot(message);
});

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);
