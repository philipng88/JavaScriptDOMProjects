(() => {
  const form = document.getElementById('tip-form');
  const amount = document.getElementById('input-bill');
  const users = document.getElementById('input-users');
  const service = document.getElementById('input-service');
  const results = document.querySelector('.results');
  const tipAmountDisplay = document.getElementById('tip-amount');
  const totalAmountDisplay = document.getElementById('total-amount');
  const personAmountDisplay = document.getElementById('person-amount');

  form.addEventListener('submit', event => {
    event.preventDefault();
    const bill = +amount.value.replace(/,/g, '');
    const people = +users.value;
    const quality = +service.value;
    const tipAmount = bill * quality;
    const totalAmount = bill + tipAmount;
    const personAmount = totalAmount / people;

    results.classList.remove('d-none');
    tipAmountDisplay.innerText = tipAmount.toFixed('2');
    totalAmountDisplay.innerText = totalAmount.toFixed('2');
    personAmountDisplay.innerText = personAmount.toFixed('2');
  });
})();
