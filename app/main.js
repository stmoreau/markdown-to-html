const { app, BrowserWindow, dialog } = require('electron');
const fs = require('fs');

let mainWindow = null;

const getFileFromUserSelection = () => {
  const files = dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Text Files', extensions: ['txt', 'text', ] },
      { name: 'Markdown Files', extensions: ['md', 'markdown', ] },
    ]
  });

  if(!files) return;

  const file = files[0];
  const content = fs.readFileSync(file).toString();
  console.log(content);
};

app.on('ready', () => {
  mainWindow = new BrowserWindow({ show: false });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    getFileFromUserSelection();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
