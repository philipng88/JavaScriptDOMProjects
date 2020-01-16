const form = document.getElementById('input-form');
const submitBtn = document.querySelector('.postfix');
const input = document.getElementById('input-value');
const listItems = document.querySelector('.collection');
const clearBtn = document.getElementById('clear-btn');

const toast = (message, alertColor) =>
  M.toast({
    html: `<span class='${alertColor}-text' style='text-transform: uppercase;'>${message}</span>`,
    displayLength: 2000
  });

const addItem = () => {
  const value = input.value;
  if (value.trim() !== '') {
    // Add to DOM
    listItems.insertAdjacentHTML(
      'afterbegin',
      `
      <li class="collection-item">
        <div>
          <span style='font-weight: bold'>${value}</span>
          <a href="#!" class="secondary-content">
            <i class="material-icons delete-btn">delete</i>
          </a>
        </div>
      </li>
    `
    );
    // Add to local storage
    let items;
    localStorage.getItem('grocery-list')
      ? (items = JSON.parse(localStorage.getItem('grocery-list')))
      : (items = []);
    items.push(value);
    localStorage.setItem('grocery-list', JSON.stringify(items));

    input.value = '';
    toast(`${value} added to the list`, 'green');
  } else {
    toast('Please enter a value', 'red');
    input.value = '';
  }
};

// Add an item (hitting enter or clicking on button)
submitBtn.addEventListener('click', () => addItem());
form.addEventListener('submit', event => {
  event.preventDefault();
  addItem();
});

// Remove all items
clearBtn.addEventListener('click', () => {
  if (listItems.children.length > 0) {
    if (window.confirm('Remove all items?')) {
      // Remove from DOM
      while (listItems.children.length > 0) {
        listItems.removeChild(listItems.children[0]);
      }
      // Remove from local storage
      localStorage.removeItem('grocery-list');
      toast('all items removed', 'red');
    }
  } else {
    toast('there are no items to remove', 'red');
  }
});

// Remove single item
listItems.addEventListener('click', event => {
  event.preventDefault();
  if (
    event.target.parentElement.parentElement.parentElement.classList.contains(
      'collection-item'
    )
  ) {
    // Remove from DOM
    listItems.removeChild(
      event.target.parentElement.parentElement.parentElement
    );
    // Remove from local storage
    const text = event.target.parentElement.previousElementSibling.innerText;
    const currentItems = JSON.parse(localStorage.getItem('grocery-list'));
    const newItems = currentItems.filter(item => {
      if (item !== text) return item;
    });
    localStorage.removeItem('grocery-list');
    localStorage.setItem('grocery-list', JSON.stringify(newItems));
    toast('item removed', 'red');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const groceryList = localStorage.getItem('grocery-list');
  if (groceryList) {
    const items = JSON.parse(groceryList);
    items.forEach(item => {
      listItems.insertAdjacentHTML(
        'afterbegin',
        `
        <li class="collection-item">
          <div>
            <span style='font-weight: bold'>${item}</span>
            <a href="#!" class="secondary-content">
              <i class="material-icons delete-btn">delete</i>
            </a>
          </div>
        </li>
      `
      );
    });
  }
});
