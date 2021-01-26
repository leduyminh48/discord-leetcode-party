const Discord = require('discord.js');
const companyBot = require('./bots/company');
const AnonymousBot = require('./bots/anonymous');
const intents = new Discord.Intents([
  Discord.Intents.NON_PRIVILEGED,
  'GUILD_MEMBERS',
]);
const client = new Discord.Client({ ws: { intents } });


client.on('ready', () => {
  console.log('I am ready!');
  subscribe(client);
});

client.login(process.env.BOT_TOKEN);

function subscribe(cl) {
  const anonBot = new AnonymousBot(cl);
  cl.on('message', (message) => {
    if (message.content === 'ping') {
      message.reply('pong');
    }

    if (message.channel.type === 'dm' && message.content.startsWith('!anon')) {
      anonBot.respond(message);
    }

    companyBot.respond(message);
  });
}