const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

let data;

const getStates = async () => {
  const res = await fetch('./data.json');
  data = await res.json();
};

const displayResults = matches => {
  if (matches.length) {
    const html = matches.map(match => {
      const { name, abbr, capital, lat, long } = match;
      return `<div class="card card-body mb-1">
                <h4>${name} (${abbr}) <span class="text-primary">${capital}</span></h4>
                <small>Lat: ${lat} / Long: ${long}</small>
              </div>`;
    });
    matchList.innerHTML = html.join('');
  }
};

const searchStates = searchValue => {
  let matches = data.filter(item => {
    const { name, abbr } = item;
    const searchCompareValue = searchValue.toLowerCase();
    const nameCompareValue = name.toLowerCase();
    const abbrCompareValue = abbr.toLowerCase();
    return (
      nameCompareValue.startsWith(searchCompareValue) ||
      abbrCompareValue.startsWith(searchCompareValue)
    );
  });

  if (searchValue.trim() === '') {
    matches = [];
    matchList.innerHTML = '';
  }

  displayResults(matches);
};

window.addEventListener('DOMContentLoaded', getStates);
search.addEventListener('input', () => searchStates(search.value));
