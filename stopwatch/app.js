const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const centiseconds = document.getElementById('centiseconds');

let currentTimerValue = 0;
let interval = false;
let lastUpdateTime = new Date().getTime();

const pad = num => `00${num}`.substr(-2);

const update = () => {
  const now = new Date().getTime();
  const changeInTime = now - lastUpdateTime;
  currentTimerValue += changeInTime;
  const time = new Date(currentTimerValue);
  minutes.innerText = pad(time.getUTCMinutes());
  seconds.innerText = pad(time.getSeconds());
  centiseconds.innerText = pad(Math.floor(time.getMilliseconds() / 10));
  lastUpdateTime = now;
};

const startTimer = () => {
  if (!interval) {
    lastUpdateTime = new Date().getTime();
    interval = setInterval(update, 1);
  }
};

const stopTimer = () => {
  clearInterval(interval);
  interval = false;
};

const resetTimer = () => {
  stopTimer();
  currentTimerValue = 0;
  minutes.innerText = pad(0);
  seconds.innerText = pad(0);
  centiseconds.innerText = pad(0);
};

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
