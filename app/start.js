const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const isDev = require('electron-is-dev');
const nodeEth = require('node-eth-address');
const path = require('path');
const url = require('url');

const menu = require('./menu');

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    height: 1080,
    title: 'Ties.DB',
    width: 1920,
  });

  mainWindow.loadURL(
    process.env.ELECTRON_START_URL || url.format({
      pathname: path.join(__dirname, './../build/index.html'),
      protocol: 'file:',
      slashes: true,
    }),
  );

  isDev && mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  !isDev && Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
};

app.on('activate', () => mainWindow === null && createWindow());
app.on('ready', createWindow);
app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit());

ipcMain.on('recover', (event, { account, password }) => {
  const key = nodeEth.recoverPrivateKey(password, account);
  event.sender.send('recover', key);
});

ipcMain.on('reload', event => mainWindow && mainWindow.reload());
