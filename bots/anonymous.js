const Discord = require('discord.js');
const randomName = require('random-username-generator');
randomName.setSeperator('-');

class AnonymousBot {
  _userNameMap = {};
  _regExpCmd = /^!anon(:([a-zA-Z\-]+))? /;

  constructor(client) {
    this._guild = client.guilds.cache.first();
    this._client = client;
  }

  respond(message) {
    if (message.author.id === this._client.user.id) {
      return;
    }
    const cmdResult = this._regExpCmd.exec(message.content);

    if (!cmdResult) {
      message.reply(`
        To send a msg anonymously to <channel-name>, follow syntax !anon:<channel-name> <message>.
        E.g: !anon:general Hi
      `);
      return;
    }
    // const userName = this._getUserName(message.author);
    const userName = randomName.generate();
    const msg = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`${userName} said:`)
      .setDescription(
        `
        ${message.content.replace(this._regExpCmd, '')}
      `,
      );
    const channelName = cmdResult[2] || 'general';
    const channel = this._guild.channels.cache.find(
      (e) => e.name === channelName,
    );
    channel
      .send(msg)
      .then(() => message.reply(`Anonymous message posted in <#${channel.id}>`))
      .catch((err) => message.reply(`Error: ${err.message}`));
  }

  _getUserName(author) {
    if (this._userNameMap[author.id]) {
      return this._userNameMap[author.id];
    }

    this._userNameMap[author.id] = randomName.generate();
    return this._userNameMap[author.id];
  }
}

module.exports = AnonymousBot;
