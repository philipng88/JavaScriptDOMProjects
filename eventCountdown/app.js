const countdown = document.getElementById('countdown');
const comingSoonText = document.querySelector('h1');
const eventDate = new Date('Jul 15, 2020 14:00:00').getTime();

const interval = setInterval(() => {
  const now = new Date().getTime();
  const timeRemaining = eventDate - now;
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  countdown.innerHTML = `
    <div>${days}<span>${days !== 1 ? 'Days' : 'Day'}</span></div>
    <div>${hours}<span>${hours !== 1 ? 'Hours' : 'Hour'}</span></div>
    <div>${minutes}<span>${minutes !== 1 ? 'Minutes' : 'Minute'}</span></div>
    <div>${seconds}<span>${seconds !== 1 ? 'Seconds' : 'Second'}</span></div>
  `;

  if (timeRemaining <= 0) {
    clearInterval(interval);
    comingSoonText.remove();
    countdown.style.color = '#17a2b8';
    countdown.innerHTML = 'Launched!';
  }
}, 1000);
