const loading = document.getElementById('loading');
const drinkImg = document.getElementById('drinkImg');
const drinkName = document.getElementById('drinkName');
const drinkDesc = document.getElementById('drinkDesc');
const drinkIngredients = document.getElementById('drinkIngredients');

const displayDrink = data => {
  loading.classList.add('hide');
  const drink = data.drinks[0];
  const { strDrinkThumb: image, strDrink: name, strInstructions: desc } = drink;
  const ingredients = [
    drink.strIngredient1,
    drink.strIngredient2,
    drink.strIngredient3,
    drink.strIngredient4,
    drink.strIngredient5,
    drink.strIngredient6,
    drink.strIngredient7,
    drink.strIngredient8,
    drink.strIngredient9,
    drink.strIngredient10,
    drink.strIngredient11,
    drink.strIngredient12,
    drink.strIngredient13,
    drink.strIngredient14,
    drink.strIngredient15,
  ];
  const measures = [
    drink.strMeasure1,
    drink.strMeasure2,
    drink.strMeasure3,
    drink.strMeasure4,
    drink.strMeasure5,
    drink.strMeasure6,
    drink.strMeasure7,
    drink.strMeasure8,
    drink.strMeasure9,
    drink.strMeasure10,
    drink.strMeasure11,
    drink.strMeasure12,
    drink.strMeasure13,
    drink.strMeasure14,
    drink.strMeasure15,
  ];

  document.title = `Cocktail Database | ${name}`;
  drinkImg.src = image;
  drinkName.textContent = name;
  drinkDesc.textContent = desc;
  ingredients.forEach(ingredient => {
    if (ingredient) {
      const ingredientIndex = ingredients.indexOf(ingredient);
      const measure = measures[ingredientIndex];
      let measureDisplay = measure;
      if (!measure) measureDisplay = '';
      drinkIngredients.insertAdjacentHTML(
        'beforeend',
        `<li class="c-list__item">${measureDisplay} <strong>${ingredient}</strong></li>`
      );
    }
  });
};

export default displayDrink;
