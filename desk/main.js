const path = require('path');

const Koa = require('koa');
const Rout = require('koa-router');
const Stat = require('koa-static');


const webApp = new Koa();
const Router = new Rout();

webApp.use(Stat(path.resolve(__dirname, './public')));
webApp.use(Router.routes());
webApp.listen(8000, () => {
    console.log('ok')
});

process.on('exit', () => {
    console.log('exit')
})

const { BrowserWindow, app, ipcMain, remote } = require('electron')

let win = null;
app.on('ready', () => {
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadURL('http://localhost:8000')
        .then(() => {

        })
    win.on('close', () => {
        console.log('close app')
    });

});

app.on('quit', () => {

});


