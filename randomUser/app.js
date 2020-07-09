// eslint-disable-next-line import/extensions
import getUser from './util/getUser.js';

const userImage = document.getElementById('userImage');
const userTitle = document.getElementById('userTitle');
const userValue = document.getElementById('userValue');
const randomUserBtn = document.getElementById('randomUserBtn');
const icons = [...document.querySelectorAll('.icon')];

const removeActiveClasses = arr => {
  arr.forEach(item => item.classList.remove('active'));
};

const showUser = async () => {
  const user = await getUser();
  userImage.src = user.profilePic;
  userImage.alt = user.name;
  userTitle.textContent = 'My name is';
  userValue.textContent = user.name;
  removeActiveClasses(icons);
  icons[0].classList.add('active');
  icons.forEach(icon => {
    const { label } = icon.dataset;
    icon.addEventListener('click', () => {
      userTitle.textContent = `My ${label} is`;
      userValue.textContent = user[label];
      removeActiveClasses(icons);
      icon.classList.add('active');
    });
  });
};

window.addEventListener('DOMContentLoaded', showUser);
randomUserBtn.addEventListener('click', showUser);
