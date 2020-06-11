/* eslint-disable prefer-destructuring */
/* eslint-disable import/extensions */
import UI from './classes/UI.js';
import Question from './classes/Question.js';

const eventListeners = () => {
  const showBtn = document.getElementById('show-btn');
  const questionCard = document.querySelector('.question-card');
  const closeBtn = document.querySelector('.close-btn');
  const form = document.getElementById('question-form');
  const feedback = document.querySelector('.feedback');
  const questionInput = document.getElementById('question-input');
  const answerInput = document.getElementById('answer-input');
  const questionList = document.getElementById('questions-list');

  let data = [];
  let id = 1;

  showBtn.addEventListener('click', () => UI.showQuestion(questionCard));
  closeBtn.addEventListener('click', () => UI.hideQuestion(questionCard));

  form.addEventListener('submit', event => {
    event.preventDefault();
    const questionValue = questionInput.value;
    const answerValue = answerInput.value;
    if (questionValue.trim() === '' || answerValue.trim() === '') {
      feedback.classList.remove('d-none');
      feedback.classList.add('alert-danger');
      feedback.innerText = 'fields cannot be empty';
      setTimeout(() => {
        feedback.classList.add('d-none');
        feedback.classList.remove('alert-danger');
        feedback.innerText = '';
      }, 3500);
    } else {
      const question = new Question(id, questionValue, answerValue);
      data.push(question);
      id++;
      UI.addQuestion(questionList, question);
      UI.clearFields(questionInput, answerInput);
    }
  });

  questionList.addEventListener('click', event => {
    event.preventDefault();

    if (event.target.classList.contains('delete-flashcard')) {
      questionList.removeChild(
        event.target.parentElement.parentElement.parentElement
      );
      const tempData = data.filter(
        item => item.id !== +event.target.dataset.id
      );
      data = tempData;
    }

    if (event.target.classList.contains('edit-flashcard')) {
      questionList.removeChild(
        event.target.parentElement.parentElement.parentElement
      );
      UI.showQuestion(questionCard);
      const tempQuestion = data.filter(
        item => item.id === +event.target.dataset.id
      );
      const tempData = data.filter(
        item => item.id !== +event.target.dataset.id
      );
      data = tempData;
      questionInput.value = tempQuestion[0].title;
      answerInput.value = tempQuestion[0].answer;
    }

    if (event.target.classList.contains('show-answer'))
      event.target.nextElementSibling.classList.toggle('d-none');
  });
};

document.addEventListener('DOMContentLoaded', () => eventListeners());
