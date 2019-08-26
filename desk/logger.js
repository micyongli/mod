const log4js = require('log4js');
const path = require('path');
 
log4js.configure({
  appenders: {
    'zj': {
      type: 'dateFile',
      filename: path.resolve(__dirname,'./log', 'Log-'),
      pattern: 'yyyyMMdd.log',
      alwaysIncludePattern: true
    }
  },
  categories: {
    default: {
      appenders: ['zj'],
      level: 'all'
    }
  }

});

module.exports = exports = log4js.getLogger('zj');
 