const productSelect = document.getElementById('product-select');
const ratingControl = document.getElementById('rating-control');

const ratings = {
  sony: 4.7,
  samsung: 3.4,
  vizio: 2.3,
  panasonic: 3.6,
  phillips: 4.1,
};

const starsTotal = 5;

let product;

const getRatings = () => {
  for (const rating in ratings) {
    const starPercentage = (ratings[rating] / starsTotal) * 100;
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    document.querySelector(
      `.${rating} .stars-inner`
    ).style.width = starPercentageRounded;
    document.querySelector(`.${rating} .number-rating`).innerText =
      ratings[rating];
  }
};

productSelect.addEventListener('change', event => {
  product = event.target.value;
  ratingControl.removeAttribute('disabled');
  ratingControl.value = ratings[product];
});

ratingControl.addEventListener('blur', event => {
  const rating = event.target.value;
  if (rating < 1 || rating > 5) {
    alert('Rating must be between 1 and 5');
  } else {
    ratings[product] = rating;
    getRatings();
  }
});

document.addEventListener('DOMContentLoaded', getRatings);
