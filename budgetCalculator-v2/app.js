const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const title = document.getElementById('title');
const amount = document.getElementById('amount');
const warning = document.getElementById('warning');
const warningClose = document.getElementById('warningClose');
const warningText = document.getElementById('warningText');

let transactions =
  localStorage.getItem('transactions') !== null
    ? JSON.parse(localStorage.getItem('transactions'))
    : [];

const addTransactionDOM = transaction => {
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  item.innerHTML = `${transaction.title} <span>${sign} $${Math.abs(
    transaction.amount
  )}</span> <button class='delete-btn' onclick='removeTransaction(${
    transaction.id
  })'>&times;</button>`;
  list.appendChild(item);
};

const updateValues = () => {
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);
  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0) * -1
  ).toFixed(2);
  balance.innerText = `$${total}`;
  moneyPlus.innerText = `$${income}`;
  moneyMinus.innerText = `$${expense}`;
};

const updateLocalStorage = () =>
  localStorage.setItem('transactions', JSON.stringify(transactions));

const addTransaction = event => {
  event.preventDefault();
  if (title.value.trim() === '' || amount.value.trim() === '') {
    warning.classList.remove('hide');
    warningText.innerText = 'Please enter a title AND an amount';
  } else {
    const transaction = {
      id: new Date().getTime(),
      title: title.value,
      amount: +amount.value,
    };
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    title.value = '';
    amount.value = '';
  }
};

const init = () => {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
};

// eslint-disable-next-line no-unused-vars
const removeTransaction = id => {
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateLocalStorage();
  init();
};

const closeWarning = () => {
  warning.classList.add('hide');
  warningText.innerText = '';
};

init();

form.addEventListener('submit', addTransaction);
warningClose.addEventListener('click', closeWarning);
