const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

const toggleVideoStatus = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

const updatePlayIcon = () => {
  play.innerHTML = `<i class='fas fa-${
    video.paused ? 'play' : 'pause'
  } fa-2x'></i>`;
};

const updateProgress = () => {
  progress.value = (video.currentTime / video.duration) * 100;
  let minutes = Math.floor(video.currentTime / 60);
  let seconds = Math.floor(video.currentTime % 60);

  if (minutes < 10) minutes = `0${String(minutes)}`;
  if (seconds < 10) seconds = `0${String(seconds)}`;
  timestamp.innerHTML = `${minutes}:${seconds}`;
};

const setVideoProgress = () => {
  video.currentTime = (+progress.value * video.duration) / 100;
};

const stopVideo = () => {
  video.currentTime = 0;
  video.pause();
};

video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);
play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoProgress);
