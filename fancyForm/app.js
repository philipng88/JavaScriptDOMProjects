const formBox = document.getElementById('form-box');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const inputGroup = document.getElementById('input-group');
const inputField = document.getElementById('input-field');
const inputLabel = document.getElementById('input-label');
const inputProgress = document.getElementById('input-progress');
const progress = document.getElementById('progress-bar');

const prompts = [
  { prompt: 'Enter Your First Name', pattern: /.+/ },
  { prompt: 'Enter Your Last Name', pattern: /.+/ },
  { prompt: 'Enter Your Email', pattern: /\S+@\S+\.\S+/ },
  { prompt: 'Enter Your Favorite Color', pattern: /.+/ },
];

const shakeTime = 100;
const switchTime = 200;

let position = 0;

const showPrompt = () => {
  inputGroup.style.opacity = 1;
  inputProgress.style.transition = '';
  inputProgress.style.width = '100%';
};

const hidePrompt = () => {
  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = 'none';
  inputGroup.style.border = null;
};

const getPrompt = () => {
  inputLabel.innerHTML = prompts[position].prompt;
  inputField.value = prompts[position].answer || '';
  inputField.focus();
  progress.style.width = (position * 100) / prompts.length + '%';
  prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';
  showPrompt();
};

const setPreviousState = () => {
  if (position > 0) {
    position -= 1;
    getPrompt();
  }
};

const setTransform = (x, y) =>
  (formBox.style.transform = `translate(${x}px, ${y}px)`);

const formComplete = () => {
  // console.log(prompts);
  const h1 = document.createElement('h1');
  h1.classList.add('end');
  h1.appendChild(
    document.createTextNode(
      `Thank you ${prompts[0].answer} ${prompts[1].answer}. We have sent a registration link to ${prompts[2].answer}`
    )
  );
  setTimeout(() => {
    formBox.parentElement.appendChild(h1);
    setTimeout(() => (h1.style.opacity = 1), 50);
  }, 1000);
};

const inputPass = () => {
  formBox.classList.remove('error');
  setTimeout(setTransform, shakeTime * 0, 0, 10);
  setTimeout(setTransform, shakeTime, 0, 0);
  prompts[position].answer = inputField.value;
  position++;
  if (prompts[position]) {
    hidePrompt();
    getPrompt();
  } else {
    hidePrompt();
    formBox.className = 'close';
    progress.style.width = '100%';
    formComplete();
  }
};

const inputFail = () => {
  const shakeIterations = 6;
  formBox.className = 'error';
  for (let i = 0; i < shakeIterations; i++) {
    setTimeout(setTransform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
    setTimeout(setTransform, shakeTime * shakeIterations, 0, 0);
    inputField.focus();
  }
};

const validate = () =>
  inputField.value.match(prompts[position].pattern) ? inputPass() : inputFail();

document.addEventListener('DOMContentLoaded', getPrompt);
prevBtn.addEventListener('click', setPreviousState);
nextBtn.addEventListener('click', validate);
inputField.addEventListener('keyup', event => {
  if (event.keyCode == 13) validate();
});
