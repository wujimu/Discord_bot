/**
 * @file eval command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license MIT
 */

exports.run = (message, args) => {
  try {
    let evaled = eval(args.join(' '));
    if (typeof evaled !== 'string') {
      evaled = require('util').inspect(evaled);
    }

    message.edit(`:inbox_tray:  **INPUT**\`\`\`js\n${args.join(' ')}\n\`\`\`:outbox_tray:  **OUTPUT**\`\`\`js\n${clean(message.client, evaled)}\n\`\`\``).catch(e => {
      message.client.log.error(e);
    });
  }
  catch(e) {
    message.edit(`:no_entry:  ERROR\`\`\`js\n${clean(message.client, e)}\n\`\`\``).catch(e => {
      message.client.log.error(e);
    });
    message.client.log.error(e);
  }
};

exports.help = {
  name: 'eval',
  description: 'Evaluates the given JavaScript expression.'
};

/**
 * Cleans the evaled result from tokens, etc.
 * @function clean
 * @param {object} client Discord.js Client object.
 * @param {string} text Evaled result/error before cleaning.
 * @returns {string} Evaled result/error after cleaning.
 */
function clean(client, text) {
  text = text.toString();
  if (text.includes(client.token)) {
    text = text.replace(client.token, 'Not for your evil eyes!');
  }
  if (typeof text === 'string') {
    return text.replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`);
  }
  return text;
}
