const choices = document.querySelectorAll('.choice');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal');
const playerScore = document.getElementById('player-score');
const computerScore = document.getElementById('computer-score');

const scoreboard = {
  player: 0,
  computer: 0,
};

const options = ['rock', 'paper', 'scissors'];

const getWinner = (playerChoice, computerChoice) => {
  let winner;
  if (playerChoice === computerChoice) {
    winner = 'Neither';
  } else if (playerChoice === 'rock' && computerChoice === 'paper') {
    winner = 'Computer';
  } else if (playerChoice === 'rock' && computerChoice === 'scissors') {
    winner = 'Player';
  } else if (playerChoice === 'paper' && computerChoice === 'rock') {
    winner = 'Player';
  } else if (playerChoice === 'paper' && computerChoice === 'scissors') {
    winner = 'Computer';
  } else if (playerChoice === 'scissors' && computerChoice === 'rock') {
    winner = 'Computer';
  } else if (playerChoice === 'scissors' && computerChoice === 'paper') {
    winner = 'Player';
  }
  return winner;
};

const showWinnerAndUpdateScore = (winner, computerChoice) => {
  switch (winner) {
    case 'Player':
      scoreboard.player++;
      playerScore.innerText = scoreboard.player;
      result.innerHTML = `
        <h1 class="text-win">You Win</h1>
        <i class="fas fa-hand-${computerChoice} fa-10x"></i>
        <p class="computer-choice-display">computer chose <strong>${computerChoice}</strong></p>
      `;
      break;
    case 'Computer':
      scoreboard.computer++;
      computerScore.innerText = scoreboard.computer;
      result.innerHTML = `
        <h1 class="text-lose">You Lose</h1>
        <i class="fas fa-hand-${computerChoice} fa-10x"></i>
        <p class="computer-choice-display">computer chose <strong>${computerChoice}</strong></p>
      `;
      break;
    case 'Neither':
      result.innerHTML = `
        <h1>It's A Draw</h1>
        <i class="fas fa-hand-${computerChoice} fa-10x"></i>
        <p class="computer-choice-display">computer chose <strong>${computerChoice}</strong></p>
      `;
      break;
    default:
      break;
  }
  modal.style.display = 'block';
};

const play = event => {
  const playerChoice = event.target.id;
  const computerChoice = options[Math.floor(Math.random() * options.length)];
  const winner = getWinner(playerChoice, computerChoice);
  restart.style.display = 'inline-block';
  showWinnerAndUpdateScore(winner, computerChoice);
};

const clearModal = event => {
  if (event.target === modal) modal.style.display = 'none';
};

const clearScoreboard = () => {
  scoreboard.player = 0;
  scoreboard.computer = 0;
  playerScore.innerText = '0';
  computerScore.innerText = '0';
  restart.style.display = 'none';
};

choices.forEach(choice => choice.addEventListener('click', play));
window.addEventListener('click', clearModal);
restart.addEventListener('click', clearScoreboard);
