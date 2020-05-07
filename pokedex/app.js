const mainScreen = document.querySelector('.main-screen');
const pokemonName = document.getElementById('pokemonName');
const pokemonId = document.getElementById('pokemonId');
const pokemonFrontImage = document.getElementById('pokemonFrontImage');
const pokemonBackImage = document.getElementById('pokemonBackImage');
const pokemonTypeOne = document.getElementById('pokemonTypeOne');
const pokemonTypeTwo = document.getElementById('pokemonTypeTwo');
const pokemonWeight = document.getElementById('pokemonWeight');
const pokemonHeight = document.getElementById('pokemonHeight');
const pokemonListContainer = document.getElementById('pokemonListContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let prevUrl = null;
let nextUrl = null;
const entriesOnScreen = 20;

const displayPokemonInfo = data => {
  const {
    id,
    name,
    weight,
    height,
    types: [dataFirstType, dataSecondType],
    sprites: { front_default: frontImage, back_default: backImage },
  } = data;

  let typeOne;
  let typeTwo;

  if (dataSecondType) {
    pokemonTypeTwo.classList.remove('hide');
    typeOne = dataSecondType.type.name;
    typeTwo = dataFirstType.type.name;
  } else {
    pokemonTypeTwo.classList.add('hide');
    typeOne = dataFirstType.type.name;
    typeTwo = null;
  }

  mainScreen.className = 'main-screen';
  mainScreen.classList.add(typeOne);
  pokemonName.innerText = name;
  pokemonId.innerText = `#${id.toString().padStart(3, '0')}`;
  pokemonWeight.innerText = weight;
  pokemonHeight.innerText = height;
  pokemonFrontImage.setAttribute('src', frontImage || '');
  pokemonBackImage.setAttribute('src', backImage || '');
  pokemonTypeOne.innerText = typeOne;
  pokemonTypeTwo.innerText = typeTwo;
};

const extractIdFromURL = url => {
  const lastIndex = url.lastIndexOf('/');
  const secondLastIndex = url.lastIndexOf('/', url.lastIndexOf('/') - 1);
  const sliceStartingPoint = secondLastIndex + 1;
  const id = url.slice(sliceStartingPoint, lastIndex);
  return id;
};

const getPokemonData = id =>
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => res.json())
    .then(data => displayPokemonInfo(data))
    .catch(err => console.log(err));

const getPokemonList = apiURL =>
  fetch(apiURL)
    .then(res => res.json())
    .then(data => {
      const { results, previous, next } = data;
      prevUrl = previous;
      nextUrl = next;
      pokemonListContainer.innerHTML = '';
      for (let i = 0; i < entriesOnScreen; i++) {
        const { name, url } = results[i];
        const id = extractIdFromURL(url);
        pokemonListContainer.insertAdjacentHTML(
          'beforeend',
          `<li class='list-item' data-id="${id}">${id}. ${name}</li>`
        );
      }
    })
    .catch(err => console.log(err));

getPokemonList('https://pokeapi.co/api/v2/pokemon');

pokemonListContainer.addEventListener('click', event => {
  if (event.target.className === 'list-item')
    getPokemonData(event.target.dataset.id);
});

const handleButtonClick = type => {
  let url;
  switch (type) {
    case 'previous':
      url = prevUrl;
      break;
    case 'next':
      url = nextUrl;
      break;
    default:
      break;
  }
  if (url) getPokemonList(url);
};

prevBtn.addEventListener('click', () => handleButtonClick('previous'));
nextBtn.addEventListener('click', () => handleButtonClick('next'));
