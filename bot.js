const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', (message) => {
    if (message.content === 'ping') {
        message.reply('pong');
        const guild = message.member.guild;

        guild.roles.cache.forEach((role) => {
            message.reply(role.name);
        });
    }
});

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);
