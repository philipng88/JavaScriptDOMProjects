const currencyElementOne = document.getElementById('currency-one');
const amountElementOne = document.getElementById('amount-one');
const currencyElementTwo = document.getElementById('currency-two');
const amountElementTwo = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swapBtn = document.getElementById('swapBtn');
const calculateBtn = document.getElementById('calculateBtn');

const calculate = () => {
  const currencyOne = currencyElementOne.value;
  const currencyTwo = currencyElementTwo.value;
  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[currencyTwo];
      const convertedValue = amountElementOne.value * rate;
      rateEl.innerHTML = `
        1 ${currencyOne} = ${rate} ${currencyTwo}<br>
        ${amountElementOne.value} ${currencyOne} = ${convertedValue} ${currencyTwo}
      `;
      amountElementTwo.value = convertedValue.toFixed(2);
    });
};

calculateBtn.addEventListener('click', calculate);
swapBtn.addEventListener('click', () => {
  [currencyElementOne.value, currencyElementTwo.value] = [currencyElementTwo.value, currencyElementOne.value];
});
