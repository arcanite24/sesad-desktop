const electron = require('electron')
const { ipcMain } = require('electron')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let mainWindow

ipcMain.on('unlock-pc', (event, args) => {
  mainWindow.setFullScreen(false);
  mainWindow.minimize();
});

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600, frame: false})
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.maximize();
  mainWindow.setFullScreen(true);

  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
