const name = document.getElementById('name');
const alert = document.getElementById('alert');
const finalScore = document.getElementById('finalScore');
const highScoreForm = document.getElementById('highScoreForm');

const mostRecentScore = localStorage.getItem('mostRecentScore') || 0;
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const lowestHighScore = Math.min(...highScores.map(item => +item.score));
const playersWithHighScore = highScores.map(item => item.name);
const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

const saveHighScore = () => {
  const scoreData = { score: mostRecentScore, name: name.value.trim() };
  highScores.push(scoreData);
  highScores.sort((a, b) => b.score - a.score).splice(MAX_HIGH_SCORES);
  localStorage.setItem('highScores', JSON.stringify(highScores));
  window.location.assign('./high-scores.html');
};

const showAlert = message => {
  alert.classList.remove('hidden');
  alert.innerText = message;
  setTimeout(() => {
    alert.classList.add('hidden');
    alert.innerText = '';
  }, 3000);
};

if (
  +mostRecentScore === 0 ||
  (highScores.length >= MAX_HIGH_SCORES && +mostRecentScore <= lowestHighScore)
) {
  highScoreForm.remove();
} else {
  highScoreForm.addEventListener('submit', event => {
    event.preventDefault();
    if (name.value.trim() !== '') {
      if (!playersWithHighScore.includes(name.value.trim())) {
        saveHighScore();
      } else {
        showAlert('Name is already in use');
      }
    } else {
      showAlert('Please enter your name');
    }
  });
}
