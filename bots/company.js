const Discord = require('discord.js');

module.exports = function (message) {
  if (!message.content.startsWith('!company ')) {
    return;
  }

  const spl = /\!company[\s]+([\s\w\W]+)/.exec(message);
  const company = spl && spl[1];

  if (company === '--stats') {
    const roles = message.member.guild.roles;
    const map = roles.reduce((acc, role) => {
      acc[role.name] = role.members.size;
      return acc;
    }, {});

    const msg = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Roles Statistics')
      .setDescription(
        `
          ${Object.keys(map)
            .map((role) => {
              return `${role}: ${map[role]}`;
            })
            .join('\n')}
        `
      )
      .setTimestamp();

    return;
  }

  addRole(message, company);
};

function addRole(message, company) {
  if (!company) {
    return;
  }

  if (company.toLowerCase() === 'admin') {
    message.reply('Haha, nice try!!!');
    return;
  }
  const guild = message.member.guild;

  const role = guild.roles.cache.find(
    (el) => el.name.toLowerCase() === company.toLowerCase()
  );

  if (role) {
    message.member.roles.add(role).then(() => {
      message.reply(`'${role.name}' added as your company`);
    });
    return;
  }

  guild.roles
    .create({
      data: {
        name: company,
        color: 'BLUE',
      },
    })
    .then(() => {
      return message.guild.roles.fetch();
    })
    .then((roles) => {
      const newRole = roles.cache.find((el) => el.name === company);
      return message.member.roles.add(newRole).then(() => newRole);
    })
    .then((newRole) => {
      message.reply(`'${newRole.name}' added as your company`);
    });
}
