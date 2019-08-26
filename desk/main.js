
const { BrowserWindow, app, Menu } = require('electron');
require('./app');
const config = require('./config');
const debug = require('debug')("zj:main.js");
let win = null;
app.on('ready', () => {
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });
    // Menu.setApplicationMenu(null);
    win.loadURL(config.url.getUrl())
        .then(v => {
            debug(`load completed by url`);
        })
    win.webContents.openDevTools();
});



