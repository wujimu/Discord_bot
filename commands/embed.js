/**
 * @file embed command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license MIT
 */

exports.run = async (message, args) => {
  try {
    await message.edit({ embed: { description: args.join(' ') } });
  }
  catch (e) {
    message.client.log.error(e);
  }
};

exports.help = {
  name: 'embed',
  description: 'Sends the message as an embed.'
};
