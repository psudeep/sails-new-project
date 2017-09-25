const config = require('config');

module.exports.connections = {
  remote: config.get('awsMysql'),
};
