const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

const showData = data => {
  if (data.data.length) {
    result.innerHTML = `
      <ul class="songs">
        ${data.data
          .map(
            song => `
          <li>
            <span><strong>${song.artist.name}</strong> - ${song.title}</span>
            <button 
              class="btn get-lyrics-btn" 
              data-artist="${song.artist.name}" 
              data-songtitle="${song.title}"
            >Get Lyrics
            </button>
          </li>
        `
          )
          .join('')}
      </ul>
    `;
  } else {
    result.innerHTML = '<p>No results found. Please try another search.</p>';
  }
  if (data.prev || data.next) {
    more.innerHTML = `
      ${
        data.prev
          ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
          : ''
      }
      ${
        data.next
          ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
          : ''
      }
    `;
  } else {
    more.innerHTML = '';
  }
};

const searchSongs = async searchValue => {
  const res = await fetch(`${apiURL}/suggest/${searchValue}`);
  const data = await res.json();
  showData(data);
};

// eslint-disable-next-line no-unused-vars
const getMoreSongs = async url => {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();
  showData(data);
};

const getLyrics = async (artist, songTitle) => {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
  if (data.error) {
    result.innerHTML = data.error;
  } else {
    result.innerHTML = `
      <h2><strong>${artist}</strong> - ${songTitle}</h2>
      <span>${lyrics}</span>
    `;
  }
  more.innerHTML = '';
};

form.addEventListener('submit', event => {
  event.preventDefault();
  const searchValue = search.value.trim();
  if (searchValue) {
    searchSongs(searchValue);
  } else {
    alert('Please enter a search value');
  }
});

result.addEventListener('click', event => {
  if (event.target.className === 'btn get-lyrics-btn') {
    const artist = event.target.getAttribute('data-artist');
    const songTitle = event.target.getAttribute('data-songtitle');
    getLyrics(artist, songTitle);
  }
});
