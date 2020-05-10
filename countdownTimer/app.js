const timerDisplay = document.getElementById('displayTimeLeft');
const endTimeDisplay = document.getElementById('displayEndTime');
const buttons = document.querySelectorAll('[data-time]');
const customForm = document.getElementById('customForm');
const customMinutesInput = document.getElementById('customMinutesInput');

let countdown;

const displayTimeRemaining = seconds => {
  const hours = Math.floor(seconds / 3600);
  let minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;

  if (minutes >= 60) minutes -= hours * 60;

  const hoursDisplay = hours ? `${hours}:` : '';
  const minutesDisplay = minutes < 10 ? `0${minutes}:` : `${minutes}:`;
  const secondsDisplay =
    remainderSeconds < 10 ? `0${remainderSeconds}` : remainderSeconds;
  const display = `${hoursDisplay}${minutesDisplay}${secondsDisplay}`;

  document.title =
    hours || minutes || remainderSeconds
      ? `Countdown Timer - ${display}`
      : "Time's up!";

  timerDisplay.textContent = display;
};

const displayEndTime = timestamp => {
  const endTime = new Date(timestamp);
  const endTimeHour = endTime.getHours();
  const endTimeMinutes = endTime.getMinutes();
  endTimeDisplay.textContent = `Be Back At ${endTimeHour}:${
    endTimeMinutes < 10 ? '0' : ''
  }${endTimeMinutes}`;
};

const timer = seconds => {
  const now = Date.now();
  const finish = now + seconds * 1000;
  clearInterval(countdown);
  displayTimeRemaining(seconds);
  displayEndTime(finish);
  countdown = setInterval(() => {
    const secondsRemaining = Math.round((finish - Date.now()) / 1000);
    if (secondsRemaining < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeRemaining(secondsRemaining);
  }, 1000);
};

buttons.forEach(button =>
  button.addEventListener('click', () => timer(+button.dataset.time))
);

customForm.addEventListener('submit', event => {
  event.preventDefault();
  timer(+customMinutesInput.value * 60);
  customMinutesInput.value = '';
});
