const lbInput = document.getElementById('lbInput');
const convertBtn = document.getElementById('convertBtn');
const alertContainer = document.getElementById('alertContainer');
const alertMessage = document.getElementById('alertMessage');
const gramsOutput = document.getElementById('gramsOutput');
const kgOutput = document.getElementById('kgOutput');
const ozOutput = document.getElementById('ozOutput');

const showAlert = message => {
  alertContainer.classList.remove('invisible');
  alertMessage.innerText = message;
  setTimeout(() => {
    alertContainer.classList.add('invisible');
  }, 2500);
};

convertBtn.addEventListener('click', () => {
  const lb = lbInput.value;
  const grams = (lb / 0.0022046).toFixed(2);
  const kg = (lb / 2.2046).toFixed(2);
  const oz = (lb * 16).toFixed(2);
  if (!lb) {
    showAlert('Please enter a value');
  } else if (lb <= 0) {
    showAlert('Please enter a value greater than zero');
  } else {
    gramsOutput.innerHTML = `<p class='mb-0'>${lb} ${
      lb == 1 ? 'pound' : 'pounds'
    } equals <span class='font-weight-bold'>${grams}</span> grams</p>`;
    kgOutput.innerHTML = `<p class='mb-0'>${lb} ${
      lb == 1 ? 'pound' : 'pounds'
    } equals <span class='font-weight-bold'>${kg}</span> kilograms</p>`;
    ozOutput.innerHTML = `<p class='mb-0'>${lb} ${
      lb == 1 ? 'pound' : 'pounds'
    } equals <span class='font-weight-bold'>${oz}</span> ounces</p>`;
  }
});
