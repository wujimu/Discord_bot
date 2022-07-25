/**
 * @file message event
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license MIT
 */

/**
 * @event message
 * @param {Message} message Discord.js Message Object
 * @returns {void}
 */
module.exports = message => {
  if (message.author.id !== message.client.credentials.clientID) return;
  if (!message.content.startsWith(message.client.config.prefix)) return;

  let args = message.content.split(' ');
  let command = args.shift().slice(message.client.config.prefix.length).toLowerCase();

  if (message.client.commands.has(command)) {
    command = message.client.commands.get(command);
  }
  else return;

  let commandLog = `\nCOMMAND> ${message.client.config.prefix}${command} `
                 + `${args.join(' ') || 'No arguments to execute'}`
                 + `\nSERVER> ${message.guild} - ${message.guild.id}`
                 + `\nCHANNEL> ${message.channel.name} - ${message.channel.id}`;
  message.client.log.console(commandLog);

  command.run(message, args);
};
