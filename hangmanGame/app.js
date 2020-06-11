const randomWords = require('random-words');

const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById(
  'final-message-reveal-word'
);
const figureParts = document.querySelectorAll('.figure-part');

const generateWord = arr => arr.reduce((x, y) => (x.length > y.length ? x : y));
let selectedWord = generateWord(randomWords(10));
let correctLetters = [];
let wrongLetters = [];
let playable = true;

const handleGameFinish = (message, revealText) => {
  finalMessage.innerText = message;
  finalMessageRevealWord.innerHTML = revealText;
  playable = false;
  popup.style.display = 'flex';
};

const displayWord = () => {
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(
        letter =>
          `<span class="letter">${
            correctLetters.includes(letter) ? letter : ''
          }</span>`
      )
      .join('')}
  `;
  if (wordEl.innerText.replace(/\n/g, '') === selectedWord)
    handleGameFinish('Congratulations! You won! 😀', '');
};

const updateWrongLettersEl = () => {
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span> ${letter}</span>`)}
  `;
  figureParts.forEach((part, index) => {
    if (index < wrongLetters.length) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }

    if (wrongLetters.length === figureParts.length)
      handleGameFinish(
        `Sorry, you lost 🙁`,
        `The word was: <span style='text-transform:uppercase'>${selectedWord}</span>`
      );
  });
};

const showNotification = () => {
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
};

window.addEventListener('keydown', event => {
  if (playable) {
    // If user enters a letter
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      const letter = event.key;
      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);
          displayWord();
        } else {
          showNotification();
        }
      } else if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

playAgainBtn.addEventListener('click', () => {
  correctLetters = [];
  wrongLetters = [];
  selectedWord = generateWord(randomWords(11));
  displayWord();
  updateWrongLettersEl();
  popup.style.display = 'none';
  playable = true;
});
displayWord();
