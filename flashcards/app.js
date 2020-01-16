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

  const ui = new UI();

  showBtn.addEventListener('click', () => ui.showQuestion(questionCard));
  closeBtn.addEventListener('click', () => ui.hideQuestion(questionCard));

  form.addEventListener('submit', function(event) {
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
      ui.addQuestion(questionList, question);
      ui.clearFields(questionInput, answerInput);
    }
  });

  questionList.addEventListener('click', event => {
    event.preventDefault();

    if (event.target.classList.contains('delete-flashcard')) {
      let id = event.target.dataset.id;
      questionList.removeChild(
        event.target.parentElement.parentElement.parentElement
      );
      let tempData = data.filter(item => item.id !== parseInt(id));
      data = tempData;
    }

    if (event.target.classList.contains('edit-flashcard')) {
      let id = event.target.dataset.id;
      questionList.removeChild(
        event.target.parentElement.parentElement.parentElement
      );
      ui.showQuestion(questionCard);
      const tempQuestion = data.filter(item => item.id === parseInt(id));
      let tempData = data.filter(item => item.id !== parseInt(id));
      data = tempData;
      questionInput.value = tempQuestion[0].title;
      answerInput.value = tempQuestion[0].answer;
    }

    if (event.target.classList.contains('show-answer'))
      event.target.nextElementSibling.classList.toggle('d-none');
  });
};

class UI {
  constructor() {}
  showQuestion(element) {
    return element.classList.remove('d-none');
  }
  hideQuestion(element) {
    return element.classList.add('d-none');
  }
  addQuestion(element, question) {
    element.insertAdjacentHTML(
      'afterbegin',
      `
    <div class="col-md-4">
      <div class="card card-body flashcard my-3">
        <h4 class="text-capitalize">${question.title}</h4>
        <a
          href="#"
          class="btn btn-sm btn-info my-3 show-answer"
        >
          Show/Hide Answer
        </a>
        <h5 class="answer mb-3 d-none">${question.answer}</h5>
        <div class="flashcard-btn d-flex justify-content-between">
          <a
            href="#"
            id="edit-flashcard"
            class="btn my-1 edit-flashcard text-uppercase"
            data-id="${question.id}"
          >
            edit <i class="fas fa-edit"></i>
          </a>
          <a
            href="#"
            id="delete-flashcard"
            class="btn my-1 delete-flashcard text-uppercase"
            data-id="${question.id}"
          >
            delete <i class="fas fa-trash"></i>
          </a>
        </div>
      </div>
    </div>
 `
    );
  }
  clearFields(question, answer) {
    question.value = '';
    answer.value = '';
  }
}

class Question {
  constructor(id, title, answer) {
    this.id = id;
    this.title = title;
    this.answer = answer;
  }
}

document.addEventListener('DOMContentLoaded', () => eventListeners());
