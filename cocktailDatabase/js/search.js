/* eslint-disable import/extensions */
import presentDrinks from './presentDrinks.js';

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const baseURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  if (searchInput.value.trim() === '') presentDrinks(`${baseURL}a`);
  presentDrinks(`${baseURL}${searchInput.value}`);
});
