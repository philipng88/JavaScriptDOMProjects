const highScoresList = document.getElementById('highScoresList');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

if (highScores.length) {
  highScores.forEach(({ name, score }, index) => {
    highScoresList.insertAdjacentHTML(
      'beforeend',
      `<li class='high-score'>${index + 1}. ${name} - ${score}</li>`
    );
  });
} else {
  document.getElementById('heading').innerText = 'no high scores yet';
  highScoresList.remove();
}
