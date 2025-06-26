import { app, BrowserWindow } from 'electron';
import * as path from 'path';

if (process.env.NODE_ENV !== 'production') {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, '../../node_modules/.bin/electron'),
    hardResetMethod: 'exit'
  });
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences:{
      preload: path.join(__dirname, '../preload/preload.ts')
    }
  })

  win.loadFile('../../src/renderer/index.html')

  if (process.env.NODE_ENV !== 'production') {
    win.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow()
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})