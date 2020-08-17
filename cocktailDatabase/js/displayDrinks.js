const loading = document.getElementById('loading');
const title = document.getElementById('title');
const section = document.querySelector('.section-center');

const displayDrinks = ({ drinks }) => {
  if (!drinks) {
    loading.classList.add('hide');
    title.textContent = 'sorry, no cocktails matched your search...';
    section.innerHTML = null;
    return;
  }
  const displayedDrinks = drinks
    .map(drink => {
      const { strDrink: name, idDrink: id, strDrinkThumb: image } = drink;
      return `
      <a href="./drink.html">
        <article class="cocktail" data-id="${id}">
          <img src="${image}" alt="${name}">
          <h3>${name}</h3>
        </article>
      </a>`;
    })
    .join('');
  loading.classList.add('hide');
  title.textContent = '';
  section.innerHTML = displayedDrinks;
  // eslint-disable-next-line consistent-return
  return section;
};

export default displayDrinks;
