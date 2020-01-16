const addItemsAction = document.querySelector('.addItems-action');
const input = document.querySelector('.addItems-input');
const submit = document.querySelector('.addItems-submit');

const list = document.querySelector('.grocery-list');
const displayItemsAction = document.querySelector('.displayItems-action');
const clear = document.querySelector('.displayItems-clear');

const addItem = event => {
  event.preventDefault();
  let value = input.value;
  if (value !== '') {
    createItem(value);
    updateStorage(value);
    showAction(addItemsAction, `${value} added to the list`, 'success');
  } else {
    showAction(addItemsAction, 'please add a grocery item', 'alert');
  }
};

const showAction = (element, text, status) => {
  element.classList.add(`${status}`);
  element.innerText = text;
  input.value = '';
  setTimeout(() => element.classList.remove(`${status}`), 3000);
};

const createItem = value => {
  const groceryItemHTML = `
    <div class="grocery-item">
      <h4 class="grocery-item__title">${value}</h4>
      <a href="#" class="grocery-item__link">
        <i class="far fa-trash-alt" id="delete-icon"></i>
      </a>
    </div>
    `;
  list.insertAdjacentHTML('afterbegin', groceryItemHTML);
};

const updateStorage = value => {
  let groceryList;
  const groceryListStorage = localStorage.getItem('groceryList');
  groceryList = groceryListStorage ? JSON.parse(groceryListStorage) : [];
  groceryList.push(value);
  localStorage.setItem('groceryList', JSON.stringify(groceryList));
};

const displayStorage = () => {
  const groceryListStorage = localStorage.getItem('groceryList');
  if (groceryListStorage) {
    const storageItems = JSON.parse(groceryListStorage);
    storageItems.forEach(element => {
      createItem(element);
    });
  }
};

const removeItems = () => {
  let groceryItems = document.querySelectorAll('.grocery-item');
  if (groceryItems.length > 0) {
    if (window.confirm('Are you sure you wish to remove all items?')) {
      groceryItems.forEach(element => list.removeChild(element));
      localStorage.getItem('groceryList') &&
        localStorage.removeItem('groceryList');
      showAction(displayItemsAction, 'all items removed', 'alert');
    }
  } else {
    showAction(displayItemsAction, 'there are no items to remove', 'alert');
  }
};

const editStorage = item => {
  const groceryItems = JSON.parse(localStorage.getItem('groceryList'));
  const index = groceryItems.indexOf(item);
  groceryItems.splice(index, 1);
  localStorage.removeItem('groceryList');
  localStorage.setItem('groceryList', JSON.stringify(groceryItems));
};

const removeSingleItem = event => {
  event.preventDefault();
  const link = event.target.parentElement;
  if (link.classList.contains('grocery-item__link')) {
    const text = link.previousElementSibling.innerHTML;
    const groceryItem = event.target.parentElement.parentElement;
    if (window.confirm(`Remove ${text}?`)) {
      list.removeChild(groceryItem);
      editStorage(text);
    }
  }
};

submit.addEventListener('click', addItem);
document.addEventListener('DOMContentLoaded', displayStorage);
clear.addEventListener('click', removeItems);
list.addEventListener('click', removeSingleItem);
