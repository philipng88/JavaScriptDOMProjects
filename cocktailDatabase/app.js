/* eslint-disable import/extensions */
import presentDrinks from './js/presentDrinks.js';
import './js/search.js';

const baseURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

window.addEventListener('DOMContentLoaded', () => {
  presentDrinks(`${baseURL}a`);
});
