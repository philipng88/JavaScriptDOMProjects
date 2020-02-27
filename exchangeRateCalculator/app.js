const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swapBtn = document.getElementById('swapBtn');
const calculateBtn = document.getElementById('calculateBtn');

const calculate = () => {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[currency_two];
      const convertedValue = amountEl_one.value * rate;
      rateEl.innerHTML = `
        1 ${currency_one} = ${rate} ${currency_two}<br>
        ${amountEl_one.value} ${currency_one} = ${convertedValue} ${currency_two}
      `;
      amountEl_two.value = convertedValue.toFixed(2);
    });
};

calculateBtn.addEventListener('click', calculate);
swapBtn.addEventListener(
  'click',
  () =>
    ([currencyEl_one.value, currencyEl_two.value] = [
      currencyEl_two.value,
      currencyEl_one.value
    ])
);
