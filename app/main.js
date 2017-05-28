const { app, BrowserWindow, dialog } = require('electron');
const fs = require('fs');

const windows = new Set();

const createWindow = exports.createWindow = () => {
  let newWindow = new BrowserWindow({ show: false });

  newWindow.loadURL(`file://${__dirname}/index.html`);
  windows.add(newWindow);

  newWindow.once('ready-to-show', () => {
    newWindow.show();
  });

  newWindow.on('closed', () => {
    windows.delete(newWindow);
    newWindow = null;
  });
};

const getFileFromUserSelection = exports.getFileFromUserSelection = (targetWindow) => {
  const files = dialog.showOpenDialog(targetWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Text Files', extensions: ['txt', 'text', ] },
      { name: 'Markdown Files', extensions: ['md', 'markdown', ] },
    ],
  });

  if(!files) return;

  return files[0];
};

const openFile = exports.openFile = (targetWindow, filePath) => {
  const file = filePath || getFileFromUserSelection(targetWindow);
  const content = fs.readFileSync(file).toString();
  targetWindow.webContents.send('file-opened', file, content);
};

app.on('ready', () => {
  createWindow();
});
