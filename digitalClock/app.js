const convertFormat = time => {
  let format;
  time >= 12 ? (format = 'PM') : (format = 'AM');
  return format;
};

const checkTime = time => {
  if (time > 12) time = time - 12;
  if (time === 0) time = 12;
  return time;
};

const addZero = time => {
  if (time < 10) time = `0${time}`;
  return time;
};

const showTime24 = () => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  hours = addZero(hours);
  minutes = addZero(minutes);
  seconds = addZero(seconds);
  document.getElementById(
    'clock24'
  ).innerHTML = `${hours} : ${minutes} : ${seconds}`;
};

const showTime12 = () => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let formatHours = convertFormat(hours);
  hours = checkTime(hours);
  hours = addZero(hours);
  minutes = addZero(minutes);
  seconds = addZero(seconds);
  document.getElementById(
    'clock12'
  ).innerHTML = `${hours} : ${minutes} : ${seconds} ${formatHours}`;
};

showTime24();
showTime12();
setInterval(showTime24, 1000);
setInterval(showTime12, 1000);
