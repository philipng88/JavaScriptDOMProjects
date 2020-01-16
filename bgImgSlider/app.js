const nextBtn = document.querySelector('.nextBtn');
const prevBtn = document.querySelector('.prevBtn');
const container = document.querySelector('.images');

let counter = 0;

const animate = () =>
  container.animate([{ opacity: '.1' }, { opacity: '1' }], {
    duration: 1000,
    fill: 'forwards'
  });

const nextSlide = () => {
  animate();
  if (counter === 4) counter = -1;
  counter++;
  container.style.backgroundImage = `url(img/bcg-${counter}.jpeg)`;
};

const prevSlide = () => {
  animate();
  if (counter === 0) counter = 5;
  counter--;
  container.style.backgroundImage = `url(img/bcg-${counter}.jpeg)`;
};

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);
