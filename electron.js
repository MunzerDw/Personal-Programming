const {app, BrowserWindow, ipcMain} = require('electron');
const {autoUpdater} = require("electron-updater");
let win; // this wills store the window object

function createDefaultWindow() {
    win = new BrowserWindow({width: 900, height: 680});
    win.loadURL(`file://${__dirname}/index.html`);
    win.on('closed', () => app.quit());
  return win;
}

var decryptedToken = "8bb2a881eae8230171munzeristhebest3eef7f23849a598ea2e96a";
var token = decryptedToken.replace('munzeristhebest', '')

process.env.GH_TOKEN = token

// when the update is ready, notify the BrowserWindow
autoUpdater.on('update-downloaded', (info) => {
    win.webContents.send('updateReady')
});
autoUpdater.on('update-available', (info) => {
  win.webContents.send('updateReady')
});
app.on('ready', function() {
  createDefaultWindow();
  autoUpdater.checkForUpdates();
});
ipcMain.on("quitAndInstall", (event, arg) => {
    autoUpdater.quitAndInstall();
})
