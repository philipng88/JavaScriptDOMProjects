const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const mealsEl = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const singleMealEl = document.getElementById('single-meal');
const alert = document.querySelector('.alert');
const alertCloseBtn = document.querySelector('.alertCloseBtn');
const alertMessage = document.querySelector('.alertMessage');

const showAlert = message => {
  alertMessage.innerText = message;
  alert.style.display = 'block';
};

const searchMeal = event => {
  event.preventDefault();
  const searchValue = search.value;
  if (searchValue.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
      .then(res => res.json())
      .then(data => {
        if (data.meals === null) {
          showAlert(`No results found for '${searchValue}'. Please try again.`);
        } else {
          singleMealEl.innerHTML = '';
          resultHeading.innerHTML = `<h2>Search results for '${searchValue}':</h2>`;
          mealsEl.innerHTML = data.meals
            .map(
              meal => `
                <div class="meal">
                  <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                  <div class="meal-info" data-mealid="${meal.idMeal}">
                    <h3>${meal.strMeal}</h3>
                  </div>
                </div>
              `
            )
            .join('');
        }
      });
    search.value = '';
  } else {
    showAlert('Please enter a search value');
  }
};

const addMealToDOM = meal => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  singleMealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
};

const getMealById = id => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => addMealToDOM(data.meals[0]));
};

const getRandomMeal = () => {
  mealsEl.innerHTML = '';
  resultHeading.innerHTML = '';
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(data => addMealToDOM(data.meals[0]));
};

submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);
mealsEl.addEventListener('click', event => {
  const mealInfo = event.path.find(item => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });
  if (mealInfo) {
    mealsEl.innerHTML = '';
    resultHeading.innerHTML = '';
    const mealID = mealInfo.getAttribute('data-mealid');
    getMealById(mealID);
  }
});

alertCloseBtn.addEventListener('click', () => (alert.style.display = 'none'));
