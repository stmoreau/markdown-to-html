const marked = require('marked');
const { remote } = require('electron');
const { getFileFromUserSelection } = remote.require('./main');

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

openFileButton.addEventListener('click', () => {
  getFileFromUserSelection();
})
