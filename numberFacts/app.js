const specificFactContainer = document.getElementById('specificFactContainer');
const specificFactDisplay = document.getElementById('specificFact');
const randomFactContainer = document.getElementById('randomFactContainer');
const randomFactDisplay = document.getElementById('randomFact');
const submitBtnLoadingSpinner = document.getElementById(
  'submitBtnLoadingSpinner'
);
const randomFactBtnLoadingSpinner = document.getElementById(
  'randomFactBtnLoadingSpinner'
);
const numberInput = document.getElementById('numberInput');
const buttons = document.getElementsByTagName('button');
const randomFactBtn = document.getElementById('randomFactBtn');
const invalidFeedback = document.querySelector('.invalid-feedback');
const form = document.getElementById('form');

const handleLoadingIndicators = (
  isLoading,
  spinnerElement,
  containerElement
) => {
  if (isLoading) {
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('disabled', '');
    }
    spinnerElement.classList.remove('d-none');
    containerElement.classList.add('d-none');
  } else {
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].removeAttribute('disabled');
    }
    spinnerElement.classList.add('d-none');
    containerElement.classList.remove('d-none');
  }
};

const showInvalidFeedback = () => {
  numberInput.classList.add('is-invalid');
  invalidFeedback.classList.remove('d-none');
};

const hideInvalidFeedback = () => {
  numberInput.classList.remove('is-invalid');
  invalidFeedback.classList.add('d-none');
};

const getSpecificFact = async event => {
  event.preventDefault();
  const number = numberInput.value;
  if (number.match(/^\d+$/)) {
    hideInvalidFeedback();
    handleLoadingIndicators(
      true,
      submitBtnLoadingSpinner,
      specificFactContainer
    );
    await fetch(`http://numbersapi.com/${number}`)
      .then(response => response.text())
      .then(data => {
        specificFactDisplay.innerText = data;
      })
      .catch(error => console.log(error));
    handleLoadingIndicators(
      false,
      submitBtnLoadingSpinner,
      specificFactContainer
    );
  } else {
    showInvalidFeedback();
  }
};

const getRandomFact = async () => {
  handleLoadingIndicators(
    true,
    randomFactBtnLoadingSpinner,
    randomFactContainer
  );
  await fetch('http://numbersapi.com/random/trivia')
    .then(response => response.text())
    .then(data => {
      randomFactDisplay.innerText = data;
    })
    .catch(error => console.log(error));
  handleLoadingIndicators(
    false,
    randomFactBtnLoadingSpinner,
    randomFactContainer
  );
};

form.addEventListener('submit', getSpecificFact);
randomFactBtn.addEventListener('click', getRandomFact);
