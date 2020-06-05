const value = document.getElementById('value');
const buttons = document.querySelectorAll('.btn');
let count = 0;

buttons.forEach(button =>
  button.addEventListener('click', event => {
    switch (event.target.id) {
      case 'increaseBtn':
        count++;
        break;
      case 'decreaseBtn':
        count--;
        break;
      case 'resetBtn':
        count = 0;
        break;
      default:
        break;
    }
    if (count > 0) value.style.color = '#7fb800';
    if (count < 0) value.style.color = '#f6511d';
    if (count === 0) value.style.color = '#333';
    value.innerText = count;
  })
);
