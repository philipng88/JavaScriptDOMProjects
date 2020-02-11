const daysDisplay = document.getElementById('days');
const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const countdown = document.getElementById('countdown');
const year = document.getElementById('year');
const loading = document.getElementById('loading');

const currentYear = new Date().getFullYear();
const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

const updateCountdown = () => {
  const currentTime = new Date();
  const diff = newYearTime - currentTime;
  const days = Math.floor(diff / 1000 / 60 / 60 / 24);
  const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
  const minutes = Math.floor(diff / 1000 / 60) % 60;
  const seconds = Math.floor(diff / 1000) % 60;
  daysDisplay.innerText = days;
  hoursDisplay.innerText = hours < 10 ? `0${hours}` : hours;
  minutesDisplay.innerText = minutes < 10 ? `0${minutes}` : minutes;
  secondsDisplay.innerText = seconds < 10 ? `0${seconds}` : seconds;
};

year.innerText = currentYear + 1;
setTimeout(() => {
  loading.remove();
  countdown.style.display = 'flex';
}, 1000);
setInterval(updateCountdown, 1000);
