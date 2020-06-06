const LoremIpsum = require('lorem-ipsum').LoremIpsum;
const copy = require('copy-text-to-clipboard');

const form = document.getElementById('form');
const selectElement = document.getElementById('structure');
const amountInput = document.getElementById('amountInput');
const loremTextDisplay = document.getElementById('loremTextDisplay');
const copyButton = document.getElementById('copyButton');
const alert = document.getElementById('alert');

const lorem = new LoremIpsum();

let textOutput;

form.addEventListener('submit', event => {
  event.preventDefault();
  switch (selectElement.value) {
    case 'paragraphs':
      textOutput = lorem
        .generateParagraphs(+amountInput.value)
        .replace(/(?:\r\n|\r|\n)/g, '\n\n');
      break;
    case 'sentences':
      textOutput = lorem.generateSentences(+amountInput.value);
      break;
    case 'words':
      textOutput = lorem.generateWords(+amountInput.value);
      break;
    default:
      break;
  }
  loremTextDisplay.innerText = textOutput;
  copyButton.classList.remove('u-display-none');
});

copyButton.addEventListener('click', () => {
  copy(textOutput);
  alert.classList.remove('u-display-none');
  setTimeout(() => alert.classList.add('u-display-none'), 2000);
});
