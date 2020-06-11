const zipForm = document.getElementById('zipForm');
const zipInput = document.getElementById('zipInput');
const results = document.getElementById('results');
const feedbackIcon = document.getElementById('feedbackIcon');

const showIcon = icon => {
  feedbackIcon.innerHTML = '';
  switch (icon) {
    case 'check':
      feedbackIcon.innerHTML = '<i class="fas fa-check"></i>';
      break;
    case 'times':
      feedbackIcon.innerHTML = '<i class="fas fa-times"></i>';
      break;
    default:
      break;
  }
};

const showResults = data => {
  results.innerHTML = '';
  data.places.forEach(item => {
    const { state, latitude, longitude } = item;
    results.insertAdjacentHTML(
      'beforeend',
      `
    <article class='message is-primary'>
      <div class='message-header'>
        <p>Location Info</p>
        <button class='delete'></button>
      </div>
      <div class='message-body'>
        <ul>
          <li><strong>City: </strong>${item['place name']}</li>
          <li><strong>State: </strong>${state} (${item['state abbreviation']})</li>
          <li><strong>Longitude: </strong>${longitude}</li>
          <li><strong>Latitude: </strong>${latitude}</li>
        </ul>
      </div>
    </article>
  `
    );
  });
};

const getLocationInfo = event => {
  event.preventDefault();
  const zip = zipInput.value;
  fetch(`https://api.zippopotam.us/us/${zip}`)
    .then(res => {
      if (res.status === 200) {
        showIcon('check');
        return res.json();
      }
      results.innerHTML = `
          <article class='message is-danger'>
            <div class='message-body'>
              Invalid Zipcode. Please try again.
            </div>  
          </article>
        `;
      showIcon('times');
      throw Error(res.statusText);
    })
    .then(data => showResults(data))
    .catch(err => console.log(err));
};

zipForm.addEventListener('submit', getLocationInfo);

results.addEventListener('click', event => {
  if (event.target.className === 'delete') {
    event.target.parentElement.parentElement.remove();
    zipInput.value = '';
  }
});
