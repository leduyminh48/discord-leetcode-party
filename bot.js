const Discord = require('discord.js');
const companyBot = require('./bots/company');
const intents = new Discord.Intents([
  Discord.Intents.NON_PRIVILEGED,
  'GUILD_MEMBERS',
]);
const client = new Discord.Client({ ws: { intents } });

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', (message) => {
  if (message.content === 'ping') {
    message.reply('pong');
  }

  companyBot.respond(message);
});

client.login(process.env.BOT_TOKEN);
