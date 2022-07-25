/**
 * @file ready event
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license MIT
 */

/**
 * @event ready
 * @param {Client} Client Discord.js Client Object
 * @returns {void}
 */
module.exports = Client => {
  Client.user.setStatus(Client.config.status);
  Client.user.setActivity(Client.config.activity.name, {
    type: Client.config.activity.type
  });

  let readyMessage = `\nClient ID> ${Client.credentials.clientID}`
                   + `\nPrefix> ${Client.config.prefix}`
                   + `\n${Client.user.tag}> Logged in!`;
  Client.log.console(readyMessage);
};
