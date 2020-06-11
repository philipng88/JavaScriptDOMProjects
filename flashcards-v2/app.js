/* eslint-disable no-alert */
const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

let currentActiveCard = 0;
const cardsEl = [];

const getCardsData = () => {
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
};

const setCardsData = cards => {
  localStorage.setItem('cards', JSON.stringify(cards));
  window.location.reload();
};
const cardsData = getCardsData();

const updateCurrentText = () => {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
};

const createCard = (data, index) => {
  const card = document.createElement('div');
  card.classList.add('card');
  if (index === 0) card.classList.add('active');
  card.innerHTML = `
    <div class="inner-card">
      <div class="inner-card-front">
        <p>${data.question}</p>
      </div>
      <div class="inner-card-back">
        <p>${data.answer}</p>
      </div>
    </div>
  `;
  card.addEventListener('click', () => card.classList.toggle('show-answer'));
  cardsEl.push(card);
  cardsContainer.appendChild(card);
  updateCurrentText();
};

const displayNavArrows = () => {
  if (currentActiveCard <= 0) {
    prevBtn.style.visibility = 'hidden';
  } else {
    prevBtn.style.visibility = 'visible';
  }

  if (currentActiveCard >= cardsEl.length - 1) {
    nextBtn.style.visibility = 'hidden';
  } else {
    nextBtn.style.visibility = 'visible';
  }
};

const updateCardsAndNavigation = (className, changeType) => {
  cardsEl[currentActiveCard].className = className;
  switch (changeType) {
    case 'increment':
      currentActiveCard++;
      break;
    case 'decrement':
      currentActiveCard--;
      break;
    default:
      break;
  }
  cardsEl[currentActiveCard].className = 'card active';
  updateCurrentText();
  displayNavArrows();
};

const toggleClearBtn = () => {
  if (cardsData.length) {
    clearBtn.style.display = 'block';
  } else {
    clearBtn.style.display = 'none';
  }
};

const createCards = () =>
  cardsData.forEach((data, index) => createCard(data, index));

createCards();
displayNavArrows();
toggleClearBtn();

nextBtn.addEventListener('click', () => {
  updateCardsAndNavigation('card left', 'increment');
  if (currentActiveCard > cardsEl.length - 1)
    currentActiveCard = cardsEl.length - 1;
});

prevBtn.addEventListener('click', () => {
  updateCardsAndNavigation('card', 'decrement');
  if (currentActiveCard < 0) currentActiveCard = 0;
});

showBtn.addEventListener('click', () => addContainer.classList.add('show'));
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

addCardBtn.addEventListener('click', () => {
  const question = questionEl.value;
  const answer = answerEl.value;
  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };
    createCard(newCard);
    questionEl.value = '';
    answerEl.value = '';
    addContainer.classList.remove('show');
    cardsData.push(newCard);
    setCardsData(cardsData);
    toggleClearBtn();
  } else {
    alert('You must provide a question and an answer');
  }
});

clearBtn.addEventListener('click', () => {
  if (cardsData.length) {
    if (window.confirm('Are you sure you wish to remove all cards?')) {
      localStorage.removeItem('cards');
      cardsContainer.innerHTML = '';
      window.location.reload();
    }
  } else {
    alert('There are no items to remove');
  }
});
