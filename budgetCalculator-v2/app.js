const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const title = document.getElementById('title');
const amount = document.getElementById('amount');

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
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
};

const updateLocalStorage = () =>
  localStorage.setItem('transactions', JSON.stringify(transactions));

const addTransaction = event => {
  event.preventDefault();
  if (title.value.trim() === '' || amount.value.trim() === '') {
    alert('Please enter a title and an amount');
  } else {
    const transaction = {
      id: Math.floor(Math.random() * 100000000),
      title: title.value,
      amount: +amount.value
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

const removeTransaction = id => {
  if (window.confirm('Are you sure you want to remove this transaction?')) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
  }
};

init();

form.addEventListener('submit', addTransaction);
