const searchInput = document.getElementById('main-search');
const searchBtn = document.getElementById('main-btn');
const searchResults = document.getElementById('results');
const loadingIcon = document.getElementById('loading-icon');

const displayData = data => {
  loadingIcon.style.display = 'none';
  searchInput.value = '';
  searchResults.innerHTML = '';
  const results = data.query.search;
  results.forEach(item => {
    searchResults.insertAdjacentHTML(
      'beforeend',
      `
      <li class="search-item">
        <h2 class="search-item__title">${item.title}</h2>
        <p class="search-item__text">${item.snippet}</p>
        <a 
          href="https://en.wikipedia.org/?curid=${item.pageid}"
          target="_blank" 
          class="search-item__link"
        >read more...
        </a>
      </li>
    `
    );
  });
};

const searchWikipedia = event => {
  event.preventDefault();
  if (searchInput.value.trim() === '') {
    alert('Please enter a search value');
  } else {
    loadingIcon.style.display = 'block';
    fetch(
      `https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&list=search&srsearch=${searchInput.value}`
    )
      .then(data => data.json())
      .then(displayData)
      .catch(error => console.log(error));
  }
};

searchBtn.addEventListener('click', searchWikipedia);
