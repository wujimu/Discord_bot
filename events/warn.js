/**
 * @file warn event
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license MIT
 */

const color = require('chalk');

module.exports = info => {
  /* eslint-disable no-console */
  console.log(color.yellow('<WARNING>'));
  console.log(info);
  console.log(color.yellow('</WARNING>'));
};
