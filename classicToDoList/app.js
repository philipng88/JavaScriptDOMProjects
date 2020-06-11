const itemForm = document.getElementById('itemForm');
const itemList = document.getElementById('item-list');
const itemInput = document.getElementById('itemInput');
const clearBtn = document.getElementById('clear-list');
const alertMessage = document.getElementById('alert-message');

let itemData = JSON.parse(localStorage.getItem('list')) || [];

const feedback = (type, message) => {
  alertMessage.classList.add(`alert-${type}`);
  alertMessage.innerText = message;
  alertMessage.classList.remove('d-none');
  setTimeout(() => {
    alertMessage.classList.add('d-none');
    alertMessage.classList.remove(`alert-${type}`);
  }, 3000);
};

const addItem = value => {
  itemList.insertAdjacentHTML(
    'afterbegin',
    `
    <div class="item my-3 d-flex">
      <h5 class="item-name text-capitalize">${value}</h5>
      <div class="item-icons">
        <a href="#" class="complete-item mx-2 item-icon">
          <i class="far fa-check-circle" title="Mark Complete"></i>
        </a>
        <a href="#" class="edit-item mx-2 item-icon">
          <i class="far fa-edit" title="Edit"></i>
        </a>
        <a href="#" class="delete-item item-icon">
          <i class="far fa-times-circle" title="Delete"></i>
        </a>
      </div>
    </div>`
  );
  feedback('success', 'Item added');
};

const handleItem = textValue => {
  const items = itemList.querySelectorAll('.item');
  items.forEach(item => {
    const itemNameElement = item.querySelector('.item-name');
    if (itemNameElement.textContent === textValue) {
      item.querySelector('.complete-item').addEventListener('click', () => {
        itemNameElement.classList.toggle('completed');
        item.classList.toggle('visibility');
      });
      item.querySelector('.edit-item').addEventListener('click', () => {
        itemInput.value = textValue;
        itemList.removeChild(item);
        itemData = itemData.filter(i => i !== textValue);
        localStorage.setItem('list', JSON.stringify(itemData));
      });
      item.querySelector('.delete-item').addEventListener('click', () => {
        itemList.removeChild(item);
        itemData = itemData.filter(i => i !== textValue);
        localStorage.setItem('list', JSON.stringify(itemData));
        feedback('success', 'Item removed');
      });
    }
  });
};

if (itemData.length > 0) {
  itemData.forEach(item => {
    itemList.insertAdjacentHTML(
      'afterbegin',
      `
    <div class="item my-3 d-flex">
      <h5 class="item-name text-capitalize">${item}</h5>
      <div class="item-icons">
        <a href="#" class="complete-item mx-2 item-icon">
          <i class="far fa-check-circle" title="Mark Complete"></i>
        </a>
        <a href="#" class="edit-item mx-2 item-icon">
          <i class="far fa-edit" title="Edit"></i>
        </a>
        <a href="#" class="delete-item item-icon">
          <i class="far fa-times-circle" title="Delete"></i>
        </a>
      </div>
    </div>`
    );
    handleItem(item);
  });
}

itemForm.addEventListener('submit', event => {
  event.preventDefault();
  const textValue = itemInput.value;
  if (textValue.trim() !== '') {
    addItem(textValue);
    itemInput.value = '';
    itemData.push(textValue);
    localStorage.setItem('list', JSON.stringify(itemData));
    handleItem(textValue);
  } else {
    feedback('danger', 'Please enter an item');
  }
});

clearBtn.addEventListener('click', () => {
  const items = itemList.querySelectorAll('.item');
  if (items.length > 0) {
    if (window.confirm('Remove all items?')) {
      itemData = [];
      items.forEach(item => itemList.removeChild(item));
      localStorage.removeItem('list');
      feedback('success', 'All items removed');
    }
  } else {
    feedback('warning', 'There are no items to remove');
  }
});
