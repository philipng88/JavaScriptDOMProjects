const alert = document.getElementById('alert');
const groceryForm = document.getElementById('groceryForm');
const groceryInput = document.getElementById('groceryInput');
const submitBtn = document.getElementById('submitBtn');
const groceryContainer = document.getElementById('groceryContainer');
const groceryList = document.getElementById('groceryList');
const clearBtn = document.getElementById('clearBtn');

const localStorageName = 'grocery-list-items';
let editElement;
let editFlag = false;
let editId = '';

const showAlert = (type, message) => {
  alert.textContent = message;
  alert.classList.add(`alert-${type}`);
  setTimeout(() => {
    alert.textContent = '';
    alert.classList.remove(`alert-${type}`);
  }, 2500);
};

const setBackToDefault = () => {
  groceryInput.value = '';
  editFlag = false;
  editId = '';
  submitBtn.textContent = 'add';
};

const getLocalStorage = () =>
  localStorage.getItem(localStorageName)
    ? JSON.parse(localStorage.getItem(localStorageName))
    : [];

const handleLocalStorageAction = (actionType, id, value) => {
  let items = getLocalStorage();
  switch (actionType) {
    case 'add':
      items.push({ id, value });
      break;
    case 'edit':
      items = items.map(item => {
        if (item.id === id) item.value = value;
        return item;
      });
      break;
    case 'remove':
      // eslint-disable-next-line consistent-return, array-callback-return
      items = items.filter(item => {
        if (item.id !== id) return item;
      });
      break;
    default:
      break;
  }
  localStorage.setItem(localStorageName, JSON.stringify(items));
};

const handleItemAction = (event, actionType) => {
  const itemElement = event.currentTarget.parentElement.parentElement;
  const itemId = itemElement.dataset.id;
  const itemName =
    event.currentTarget.parentElement.previousElementSibling.textContent;
  switch (actionType) {
    case 'delete':
      groceryList.removeChild(itemElement);
      if (!groceryList.children.length)
        groceryContainer.classList.remove('show-container');
      showAlert('success', `removed ${itemName} from the list`);
      handleLocalStorageAction('remove', itemId);
      setBackToDefault();
      break;
    case 'edit':
      editElement = event.currentTarget.parentElement.previousElementSibling;
      groceryInput.value = itemName;
      editFlag = true;
      editId = itemId;
      submitBtn.textContent = 'update';
      break;
    default:
      break;
  }
};

const createListItem = (id, value) => {
  const groceryItem = document.createElement('article');
  const groceryItemId = document.createAttribute('data-id');
  groceryItem.classList.add('grocery-item');
  groceryItemId.value = id;
  groceryItem.setAttributeNode(groceryItemId);
  groceryItem.innerHTML = `
    <p class='title'>${value}</p>
    <div class='btn-container'>
      <button type='button' class='edit-btn' title='Edit'>
        <i class='fas fa-edit'></i>
      </button>
      <button type='button' class='delete-btn' title='Delete'>
        <i class='fas fa-trash'></i>
      </button>
    </div>
  `;
  const deleteBtn = groceryItem.querySelector('.delete-btn');
  const editBtn = groceryItem.querySelector('.edit-btn');
  deleteBtn.addEventListener('click', event =>
    handleItemAction(event, 'delete')
  );
  editBtn.addEventListener('click', event => handleItemAction(event, 'edit'));
  groceryList.appendChild(groceryItem);
};

const setupItems = () => {
  const items = getLocalStorage();
  if (items.length) {
    items.forEach(item => createListItem(item.id, item.value));
    groceryContainer.classList.add('show-container');
  }
};

const clearItems = () => {
  const items = document.querySelectorAll('.grocery-item');
  if (window.confirm('Remove all items from your grocery list?')) {
    if (items.length) items.forEach(item => groceryList.removeChild(item));
    groceryContainer.classList.remove('show-container');
    showAlert('success', 'all items removed');
    setBackToDefault();
  }
  localStorage.removeItem(localStorageName);
};

const addItem = event => {
  event.preventDefault();
  // eslint-disable-next-line prefer-destructuring
  const value = groceryInput.value;
  const id = new Date().getTime().toString();
  if (value.trim() !== '') {
    if (!editFlag) {
      createListItem(id, value);
      groceryContainer.classList.add('show-container');
      showAlert('success', 'item added to list');
      handleLocalStorageAction('add', id, value);
      setBackToDefault();
    } else {
      editElement.textContent = value;
      showAlert('success', 'item updated');
      handleLocalStorageAction('edit', editId, value);
      setBackToDefault();
    }
  } else {
    showAlert('danger', 'please enter a grocery item');
    groceryInput.value = '';
  }
};

groceryForm.addEventListener('submit', addItem);
clearBtn.addEventListener('click', clearItems);
window.addEventListener('DOMContentLoaded', setupItems);
