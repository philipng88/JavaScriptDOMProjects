const result = document.getElementById('result');
const generate = document.getElementById('generate');
const clipboardBtn = document.getElementById('clipboard');
const alert = document.querySelector('.alert');
const alertMessage = document.querySelector('.alert-msg');
const alertClose = document.querySelector('.close-alert');

const unicodeNumber = [48, 57];
const unicodeUpper = [65, 90];
const unicodeLower = [97, 122];
const unicodeSymbol = [33, 47];

const showAlert = (type, message) => {
  alert.style.display = 'block';
  switch (type) {
    case 'error':
      alert.classList.add('alert-danger');
      break;
    case 'success':
      alert.classList.add('alert-success');
      break;
    default:
      break;
  }
  alertMessage.innerText = message;
};

alertClose.addEventListener('click', () => {
  alert.style.display = 'none';
  alert.className = 'alert';
  alertMessage.innerText = '';
});

clipboardBtn.addEventListener('click', () => {
  const textArea = document.createElement('textarea');
  if (result.innerText) {
    textArea.value = result.innerText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
    showAlert('success', 'Password copied to clipboard!');
  } else {
    return;
  }
});

generate.addEventListener('click', () => {
  const passwordLength = document.getElementById('length').value;
  const upper = document.getElementById('uppercase').checked;
  const numbers = document.getElementById('numbers').checked;
  const symbols = document.getElementById('symbols').checked;

  const randSelector = [];
  const password = [];

  const addToSelector = arr => {
    for (let i = arr[0]; i <= arr[1]; i++) randSelector.push(i);
  };

  if (passwordLength >= 8 && passwordLength <= 20) {
    addToSelector(unicodeLower);
    upper && addToSelector(unicodeUpper);
    numbers && addToSelector(unicodeNumber);
    symbols && addToSelector(unicodeSymbol);

    for (let i = 0; i < passwordLength; i++)
      password.push(
        String.fromCharCode(
          randSelector[Math.floor(Math.random() * randSelector.length)]
        )
      );

    result.innerText = password.join('');
  } else {
    showAlert('error', 'Password length must be between 8 and 20');
  }
});
