const { BrowserWindow, app } = require('electron');

let win = null;
app.on('ready', () => {
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadFile('./public/index.html');
    win.webContents.openDevTools();
});



