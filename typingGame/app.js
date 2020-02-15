const randomWords = require('random-words');

const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

let randomWord;
let score = 0;
let time = 10;
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

timeEl.innerText = `${time}s`;
scoreEl.innerText = score;
difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

const addWordToDOM = () => {
  randomWord = randomWords();
  word.innerHTML = randomWord;
};

const updateScore = () => {
  score++;
  scoreEl.innerText = score;
};

const gameOver = () => {
  endgameEl.innerHTML = `
    <h1>Time is up!</h1>
    <p>Your final score is: ${score}</p>
    <button onclick='location.reload()'>Reload</button>
  `;
  endgameEl.style.display = 'flex';
};

const updateTime = () => {
  time--;
  timeEl.innerText = `${time}s`;
  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
};

const timeInterval = setInterval(updateTime, 1000);
addWordToDOM();

text.addEventListener('input', event => {
  const insertedText = event.target.value;
  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();
    event.target.value = '';
    switch (difficulty) {
      case 'hard':
        time += 2;
        break;
      case 'medium':
        time += 4;
        break;
      case 'easy':
        time += 6;
        break;
      default:
        break;
    }
    updateTime();
  }
});

settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));
settingsForm.addEventListener('change', event => {
  difficulty = event.target.value;
  localStorage.setItem('difficulty', difficulty);
});
