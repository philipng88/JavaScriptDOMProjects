const slides = document.querySelectorAll('.slide');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

const changeSlide = type => {
  const currentSlide = document.querySelector('.current');
  currentSlide.classList.remove('current');
  switch (type) {
    case 'next':
      currentSlide.nextElementSibling
        ? currentSlide.nextElementSibling.classList.add('current')
        : slides[0].classList.add('current');
      break;
    case 'previous':
      currentSlide.previousElementSibling
        ? currentSlide.previousElementSibling.classList.add('current')
        : slides[slides.length - 1].classList.add('current');
      break;
    default:
      break;
  }
  setTimeout(() => currentSlide.classList.remove('current'), 200);
};

nextBtn.addEventListener('click', () => changeSlide('next'));
prevBtn.addEventListener('click', () => changeSlide('previous'));
