const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playPauseIcon = document.getElementById('play-pause-icon');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

const songs = ['hey', 'summer', 'ukulele'];

let songIndex = 2;

const loadSong = song => {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
};

const playSong = () => {
  musicContainer.classList.add('play');
  playPauseIcon.classList.remove('fa-play');
  playPauseIcon.classList.add('fa-pause');
  audio.play();
};

const pauseSong = () => {
  musicContainer.classList.remove('play');
  playPauseIcon.classList.remove('fa-pause');
  playPauseIcon.classList.add('fa-play');
  audio.pause();
};

const prevSong = () => {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  playSong();
};

const nextSong = () => {
  songIndex++;
  if (songIndex > songs.length - 1) songIndex = 0;
  loadSong(songs[songIndex]);
  playSong();
};

const updateProgress = event => {
  const { duration, currentTime } = event.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
};

const setProgress = event => {
  const width = progressContainer.clientWidth;
  const clickX = event.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
};

loadSong(songs[songIndex]);

playBtn.addEventListener('click', () => {
  if (musicContainer.classList.contains('play')) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);
