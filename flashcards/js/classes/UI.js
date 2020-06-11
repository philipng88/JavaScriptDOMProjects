export default class UI {
  static showQuestion(element) {
    element.classList.remove('d-none');
  }

  static hideQuestion(element) {
    element.classList.add('d-none');
  }

  static addQuestion(element, question) {
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

  static clearFields(question, answer) {
    question.value = '';
    answer.value = '';
  }
}
