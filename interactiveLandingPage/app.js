const toggle = document.getElementById('toggle');
const toggleIcon = document.getElementById('toggle-icon');
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');

toggle.addEventListener('click', () => {
  if (toggleIcon.classList.contains('fa-bars')) {
    toggleIcon.classList.remove('fa-bars');
    toggleIcon.classList.add('fa-times');
  } else if (toggleIcon.classList.contains('fa-times')) {
    toggleIcon.classList.add('fa-bars');
    toggleIcon.classList.remove('fa-times');
  }
  document.body.classList.toggle('show-nav');
});

open.addEventListener('click', () => (modal.style.display = 'block'));
close.addEventListener('click', () => (modal.style.display = 'none'));

// Form Validation
const form = document.querySelector('.modal-form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const showError = (input, message) => {
  const formControl = input.parentElement;
  const errorMessage = formControl.querySelector('.error-msg');
  formControl.className = 'form-control error';
  errorMessage.innerText = message;
};

const showSuccess = input => {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
};

const checkEmail = input => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  regex.test(input.value)
    ? showSuccess(input)
    : showError(input, 'Invalid Email');
};

const checkpasswordLength = (input, min) => {
  input.value.length < min
    ? showError(input, `Password must be at least ${min} characters`)
    : showSuccess(input);
};

const checkPasswordsMatch = (input1, input2) => {
  if (input1.value !== input2.value)
    showError(input2, 'Passwords do not match');
};

const resetForm = arr => {
  arr.forEach(element => {
    element.value = '';
    element.parentElement.className = 'form-control';
  });
};

form.addEventListener('submit', event => {
  event.preventDefault();
  name.value.trim() === ''
    ? showError(name, 'Please provide your name')
    : showSuccess(name);
  password2.value === ''
    ? showError(password2, 'Please confirm your password')
    : showSuccess(password2);
  checkpasswordLength(password, 6);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});

document
  .querySelector('.reset-form-btn')
  .addEventListener('click', () =>
    resetForm([name, email, password, password2])
  );
