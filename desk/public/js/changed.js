const { remote } = require('electron')

console.log(remote.app.emit('mess', { code: 2 }))