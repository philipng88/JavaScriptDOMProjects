const question = document.getElementById('question');
const choices = Array.from(document.querySelectorAll('.choice-container'));
const progressText = document.getElementById('progressText');
const progressBar = document.getElementById('progressBar');
const scoreDisplay = document.getElementById('score');
const game = document.getElementById('game');
const loader = document.getElementById('loader');

let currentQuestion;
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;
const API_URL = `https://opentdb.com/api.php?amount=${MAX_QUESTIONS}&category=9&difficulty=easy&type=multiple`;

const endGame = () => {
  localStorage.setItem('mostRecentScore', score);
  return window.location.assign('./game-end.html');
};

const getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    endGame();
    return;
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter} / ${MAX_QUESTIONS}`;
  progressBar.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerHTML = currentQuestion.question;
  choices.forEach(choice => {
    const choiceNumber = choice.dataset.number;
    const choiceText = choice.children[1];
    choiceText.innerHTML = currentQuestion[`choice${choiceNumber}`];
  });
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

const startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  game.classList.remove('hidden');
  loader.classList.add('hidden');
};

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    questions = data.results.map(item => {
      const formattedQuestion = {
        question: item.question,
      };
      const answerChoices = [...item.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
      answerChoices.splice(
        formattedQuestion.answer - 1,
        0,
        item.correct_answer
      );
      answerChoices.forEach((choice, index) => {
        formattedQuestion[`choice${index + 1}`] = choice;
      });
      return formattedQuestion;
    });
    startGame();
  })
  .catch(err => console.error(err));

const incrementScore = num => {
  score += num;
  scoreDisplay.innerText = score;
};

choices.forEach(choice => {
  choice.addEventListener('click', event => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedAnswer = +event.currentTarget.dataset.number;
    const answerIsCorrect = selectedAnswer === currentQuestion.answer;
    if (answerIsCorrect) incrementScore(CORRECT_BONUS);
    const choiceText = choice.children[1];
    choiceText.classList.add(answerIsCorrect ? 'correct' : 'incorrect');
    setTimeout(() => {
      choiceText.className = 'choice-text';
      getNewQuestion();
    }, 1000);
  });
});
