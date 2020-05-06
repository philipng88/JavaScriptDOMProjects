const currentSol = document.getElementById('currentSol');
const currentDate = document.getElementById('currentDate');
const currentTempHigh = document.getElementById('currentTempHigh');
const currentTempLow = document.getElementById('currentTempLow');
const windSpeedDisplay = document.getElementById('windSpeed');
const windDirectionText = document.getElementById('windDirectionText');
const windDirectionArrow = document.getElementById('windDirectionArrow');
const previousWeather = document.getElementById('previousWeather');
const previousWeatherToggle = document.getElementById('previousWeatherToggle');
const previousSolsContainer = document.getElementById('previousSolsContainer');
const unitToggle = document.getElementById('unitToggle');
const metricRadio = document.getElementById('cel');
const imperialRadio = document.getElementById('fah');

const API_URL =
  'https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0';

const getWeather = () =>
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const { sol_keys, validity_checks, ...solData } = data;
      return Object.entries(solData).map(([sol, data]) => {
        const {
          AT: { mx: maxTemp, mn: minTemp },
          HWS: { av: windSpeed },
          WD: {
            most_common: {
              compass_degrees: windDirectionDegrees,
              compass_point: windDirectionCardinal,
            },
          },
          First_UTC,
        } = data;
        return {
          sol,
          maxTemp,
          minTemp,
          windSpeed,
          windDirectionDegrees,
          windDirectionCardinal,
          date: new Date(First_UTC),
        };
      });
    });

const displayDate = date =>
  date.toLocaleDateString(undefined, { day: 'numeric', month: 'long' });

const displayTemperature = temperature => {
  let returnTemp = temperature;
  if (!isMetric()) returnTemp = (temperature - 32) * (5 / 9);
  return Math.round(returnTemp);
};

const displaySpeed = speed => {
  let returnSpeed = speed;
  if (!isMetric()) returnSpeed = speed / 1.609;
  return Math.round(returnSpeed);
};

const updateUnits = () => {
  const speedUnit = document.getElementById('speedUnit');
  const tempUnits = document.querySelectorAll('.temp-unit');
  speedUnit.innerText = isMetric() ? 'kph' : 'mph';
  tempUnits.forEach(unit => (unit.innerText = isMetric() ? 'C' : 'F'));
};

const isMetric = () => metricRadio.checked;

const displayCurrentSol = sols => {
  const {
    sol,
    date,
    maxTemp,
    minTemp,
    windSpeed,
    windDirectionDegrees,
    windDirectionCardinal,
  } = sols[sols.length - 1];
  currentSol.innerText = sol;
  currentDate.innerText = displayDate(date);
  currentTempHigh.innerText = displayTemperature(maxTemp);
  currentTempLow.innerText = displayTemperature(minTemp);
  windSpeedDisplay.innerText = displaySpeed(windSpeed);
  windDirectionArrow.style.transform = `translateY(-50%) rotate(${windDirectionDegrees}deg)`;
  windDirectionText.innerText = windDirectionCardinal;
};

const displayPreviousSols = sols => {
  previousSolsContainer.innerHTML = '';
  sols.forEach(({ sol, date, maxTemp, minTemp }) => {
    const returnDate = displayDate(date);
    const returnMaxTemp = displayTemperature(maxTemp);
    const returnMinTemp = displayTemperature(minTemp);
    previousSolsContainer.insertAdjacentHTML(
      'beforeend',
      `
			<div class="previous-day">
				<h3 class="previous-day__sol">Sol ${sol}</h3>
				<p class="previous-day__date">${returnDate}</p>
				<p class="previous-day__temp">
					High: ${returnMaxTemp}&deg;<span class="temp-unit"></span>
				</p>
				<p class="previous-day__temp">
					Low: ${returnMinTemp}&deg;<span class="temp-unit"></span>
				</p>
			</div>
			`
    );
  });
};

const updateUI = sols => {
  displayCurrentSol(sols);
  displayPreviousSols(sols);
  updateUnits();
};

getWeather().then(sols => {
  updateUI(sols);

  unitToggle.addEventListener('click', () => {
    let metricUnits = !isMetric();
    metricRadio.checked = metricUnits;
    imperialRadio.checked = !metricUnits;
    updateUI(sols);
  });

  document
    .querySelectorAll('.unit-radio')
    .forEach(radioBtn =>
      radioBtn.addEventListener('change', () => updateUI(sols))
    );
});

previousWeatherToggle.addEventListener('click', () =>
  previousWeather.classList.toggle('show-weather')
);
