const { app, BrowserWindow } = require('electron');

let win;

function createWindow () {
    win = new BrowserWindow({
        width: 560, height: 335,
        alwaysOnTop: true,
        frame: false,
    });

    win.loadFile('src/index.html');

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
