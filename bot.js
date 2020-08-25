const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', (message) => {
    if (message.content === 'ping') {
        message.reply('pong')
    }

    if (message.content.startsWith('!company ')) {
        const spl = message.content.split(' ');
        const company = spl[spl.length - 1];

        if (!company) {
            return;
        }
        const guild = message.member.guild;

        const role = guild.roles.cache.find(
            (el) => el.name.toLowerCase() === company.toLowerCase()
        );

        if (role) {
            message.member.roles.add(role).then(() => {
                message.reply('Company added');
            });
            return;
        }

        guild.roles.create({
            data: {
                name: company,
                color: 'BLUE',
            }
        }).then(() => {
            return message.guild.roles.fetch();
        }).then(roles => {
            roles.cache.find(el => el.name = company);
            message.member.roles.add(role).then(() => {
                message.reply('Company added');
            });
        });
    }
});

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);
