/* eslint-disable no-use-before-define */
const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');

const movies = [
  'Avengers: Endgame',
  'Avatar',
  'Titanic',
  'Star Wars: Episode VII - The Force Awakens',
  'Avengers: Infinity War',
  'Jurassic World',
  'The Lion King (2019)',
  "Marvel's The Avengers",
  'Furious 7',
  'Avengers: Age of Ultron',
];

const listItems = [];

let dragStartIndex;

const createList = () => {
  [...movies]
    .map(item => ({ value: item, sort: Math.random() }))
    .sort((x, y) => x.sort - y.sort)
    .map(item => item.value)
    .forEach((movie, index) => {
      const listItem = document.createElement('li');
      listItem.setAttribute('data-index', index);
      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="movie-title">${movie}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;
      listItems.push(listItem);
      draggableList.appendChild(listItem);
    });
  addEventListeners();
};

function dragStart() {
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragOver(event) {
  event.preventDefault();
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove('over');
}

function dragEnter() {
  this.classList.add('over');
}

function dragLeave() {
  this.classList.remove('over');
}

const swapItems = (fromIndex, toIndex) => {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');
  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
};

const checkOrder = () => {
  let numberWrong = 0;
  listItems.forEach((listItem, index) => {
    const movieTitle = listItem.querySelector('.draggable').innerText.trim();
    if (movieTitle !== movies[index]) {
      listItem.classList.add('wrong');
      numberWrong++;
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
  if (numberWrong === 0) {
    alert('All Correct!', 100);
  } else {
    alert(`${movies.length - numberWrong} / ${movies.length} correct`, 100);
  }
};

const addEventListeners = () => {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');
  draggables.forEach(draggable =>
    draggable.addEventListener('dragstart', dragStart)
  );
  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
};

createList();
check.addEventListener('click', checkOrder);
