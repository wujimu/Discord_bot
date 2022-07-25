/**
 * @file error event
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license MIT
 */

const color = require('chalk');

module.exports = error => {
  /* eslint-disable no-console */
  console.log(color.red('<ERROR>'));
  console.log(error);
  console.log(color.red('</ERROR>'));
};
