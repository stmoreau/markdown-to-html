const marked = require('marked');
const { remote, ipcRenderer } = require('electron');
const { openFile, createWindow } = remote.require('./main');
const currentWindow = remote.getCurrentWindow();

const markdownView = document.querySelector('#markdown');
const htmlView = document.querySelector('#html');
const newFileButton = document.querySelector('#new-file');
const openFileButton = document.querySelector('#open-file');
const saveMarkdownButton = document.querySelector('#save-markdown');
const revertButton = document.querySelector('#revert');
const saveHtmlButton = document.querySelector('#save-html');

const renderMarkdownToHtml = (markdown) => {
  htmlView.innerHTML = marked(markdown, { sanitize: true });
};

markdownView.addEventListener('keyup', () => {
  renderMarkdownToHtml(event.target.value);
});

newFileButton.addEventListener('click', () => {
  createWindow();
});

openFileButton.addEventListener('click', () => {
  openFile(currentWindow);
});

ipcRenderer.on('file-opened', (event, file, content) => {
  markdownView.value = content;
  renderMarkdownToHtml(content);
});
