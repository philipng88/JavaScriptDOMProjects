const container = document.getElementById('container');
const prompt = document.getElementById('prompt');

const totalTime = 7500;
const holdTime = totalTime / 5;
const breatheTime = (totalTime / 5) * 2;

const breathAnimation = () => {
  prompt.innerText = 'Breathe In!';
  container.className = 'container grow';
  setTimeout(() => {
    prompt.innerText = 'Hold';
    setTimeout(() => {
      prompt.innerText = 'Breathe Out!';
      container.className = 'container shrink';
    }, holdTime);
  }, breatheTime);
};

breathAnimation();
setInterval(breathAnimation, totalTime);
