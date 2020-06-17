const name = document.getElementById('name');
const finalScore = document.getElementById('finalScore');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const highScoreForm = document.getElementById('highScoreForm');

const mostRecentScore = localStorage.getItem('mostRecentScore') || 0;
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const lowestHighScore = Math.min(...highScores.map(item => +item.score));
const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

const saveHighScore = event => {
  event.preventDefault();
  const scoreData = { score: mostRecentScore, name: name.value };
  highScores.push(scoreData);
  highScores.sort((a, b) => b.score - a.score).splice(MAX_HIGH_SCORES);
  localStorage.setItem('highScores', JSON.stringify(highScores));
  window.location.assign('./index.html');
};

const addFormEventListeners = () => {
  name.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !name.value.trim();
  });
  highScoreForm.addEventListener('submit', saveHighScore);
};

if (highScores.length < MAX_HIGH_SCORES || mostRecentScore > lowestHighScore) {
  addFormEventListeners();
} else {
  highScoreForm.remove();
}
