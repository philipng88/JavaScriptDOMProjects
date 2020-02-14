const squares = document.querySelectorAll('.square');
const colorDisplay = document.getElementById('colorDisplay');
const messageDisplay = document.getElementById('message');
const title = document.getElementById('title');
const resetButton = document.getElementById('reset');
const modeButtons = document.querySelectorAll('.mode');

let numSquares = 6;
let colors = [];
let pickedColor;

const changeColors = color =>
  squares.forEach(square => (square.style.backgroundColor = color));
const pickColor = () => colors[Math.floor(Math.random() * colors.length)];

const generateRandomColors = num => {
  let arr = [];
  for (var i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
};

const randomColor = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
};

const reset = () => {
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = 'New Colors';
  messageDisplay.textContent = '';
  title.style.background = 'steelblue';
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = 'block';
      squares[i].style.background = colors[i];
    } else {
      squares[i].style.display = 'none';
    }
  }
};

const setModeButtons = () => {
  for (let i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener('click', function() {
      modeButtons[0].classList.remove('selected');
      modeButtons[1].classList.remove('selected');
      this.classList.add('selected');
      this.textContent === 'Easy' ? (numSquares = 3) : (numSquares = 6);
      reset();
    });
  }
};

const setSquares = () => {
  for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', function() {
      let clickedColor = this.style.backgroundColor;
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = 'Correct!';
        resetButton.textContent = 'Play Again';
        changeColors(clickedColor);
        title.style.backgroundColor = pickedColor;
      } else {
        this.style.backgroundColor = '#232323';
        messageDisplay.textContent = 'Try Again';
      }
    });
  }
};

const init = () => {
  setModeButtons();
  setSquares();
  reset();
};

resetButton.addEventListener('click', () => reset());

init();
