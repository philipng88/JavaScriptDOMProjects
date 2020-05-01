const currentImage = document.getElementById('current');
const imageContainer = document.querySelector('.imgs');
const images = document.querySelectorAll('.imgs img');
const opacity = 0.5;

images[0].style.opacity = opacity;

const imgClick = event => {
  if (event.target.tagName === 'IMG') {
    images.forEach(image => (image.style.opacity = 1));
    currentImage.src = event.target.src;
    currentImage.classList.add('fade-in');
    setTimeout(() => currentImage.classList.remove('fade-in'), 500);
    event.target.style.opacity = opacity;
  }
};

imageContainer.addEventListener('click', event => imgClick(event));
