const startModal = document.querySelector('.start-modal');
const endgameModal = document.querySelector('.endgame-modal');
const gameContainer = document.querySelector('.memory-game');
const flipSound = new Audio('./audio/flip.wav');
const matchSound = new Audio('./audio/match.wav');
const victorySound = new Audio('./audio/victory.wav');
const javascriptFrameworks = [
  'angular',
  'aurelia',
  'backbone',
  'ember',
  'react',
  'vue',
];
const phpFrameworks = [
  'cakephp',
  'codeigniter',
  'phalcon',
  'laravel',
  'symfony',
  'zend',
];
const numCards = javascriptFrameworks.length * 2 || phpFrameworks.length * 2;

let hasFlippedCard = false;
let boardIsLocked = false;
let firstCard;
let secondCard;

function flipCard() {
  if (boardIsLocked) return;
  if (this === firstCard) return;

  flipSound.play();
  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  hasFlippedCard = false;
  secondCard = this;
  checkForMatch();
  checkForCompletion();
}

const checkForCompletion = () => {
  const cardsFlipped = Array.from(
    document.querySelectorAll('.memory-card')
  ).filter(card => card.classList.contains('flip'));
  if (cardsFlipped.length === numCards) checkPlayAgain();
};

const checkPlayAgain = () => {
  setTimeout(() => victorySound.play(), 500);
  setTimeout(() => endgameModal.classList.remove('u-display-none'), 750);
  endgameModal.addEventListener('click', event => {
    switch (event.target.id) {
      case 'yesButton':
        location.reload();
        break;
      case 'noButton':
        endgameModal.classList.add('u-display-none');
        break;
      default:
        break;
    }
  });
};

const checkForMatch = () => {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    disableCards();
    setTimeout(() => matchSound.play(), 500);
  } else {
    unflipCards();
  }
};

const disableCards = () => {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetVariables();
};

const unflipCards = () => {
  boardIsLocked = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetVariables();
  }, 1500);
};

const resetVariables = () => {
  hasFlippedCard = false;
  boardIsLocked = false;
  firstCard = null;
  secondCard = null;
};

const initializeGame = (frameworks, imageFolder) => {
  frameworks.forEach(framework => {
    for (let i = 0; i < 2; i++) {
      gameContainer.insertAdjacentHTML(
        'beforeend',
        `
        <div class="memory-card" data-framework="${framework}">
          <img class="front-face" src="./images/${imageFolder}/${framework}.svg" alt="${framework}" />
          <img class="back-face" src="./images/${imageFolder}/${imageFolder}-badge.svg" alt="${imageFolder} badge" />
        </div>
  
        `
      );
    }
  });
  const cards = gameContainer.querySelectorAll('.memory-card');

  // shuffle cards
  cards.forEach(
    card => (card.style.order = Math.floor(Math.random() * numCards))
  );

  cards.forEach(card => card.addEventListener('click', flipCard));
};

startModal.addEventListener('click', event => {
  switch (event.target.id) {
    case 'javascriptButton':
      initializeGame(javascriptFrameworks, 'js');
      startModal.classList.add('u-display-none');
      break;
    case 'phpButton':
      initializeGame(phpFrameworks, 'php');
      startModal.classList.add('u-display-none');
      break;
    default:
      break;
  }
});
