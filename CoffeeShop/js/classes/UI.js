import {
  preloader,
  nav,
  navIcon,
  videoSwitchBtn,
  videoItem,
  drinkFormFeedback,
  inputName,
  inputLastName,
  inputEmail,
  drinkCardList,
  workModal,
  workModalItem,
} from '../selectors.js';

export default class UI {
  hidePreloader() {
    return (preloader.style.display = 'none');
  }

  toggleNav() {
    return nav.classList.toggle('nav--show');
  }

  toggleNavIcon() {
    if (navIcon.classList.contains('fa-bars')) {
      navIcon.classList.remove('fa-bars');
      navIcon.classList.add('fa-times');
    } else if (navIcon.classList.contains('fa-times')) {
      navIcon.classList.remove('fa-times');
      navIcon.classList.add('fa-bars');
    }
  }

  toggleVideo() {
    if (videoSwitchBtn.classList.contains('btnSlide')) {
      videoSwitchBtn.classList.remove('btnSlide');
      videoItem.play();
    } else {
      videoSwitchBtn.classList.add('btnSlide');
      videoItem.pause();
    }
  }

  hasEmptyValues() {
    return (
      inputName.value.trim() === '' ||
      inputLastName.value.trim() === '' ||
      inputEmail.value.trim() === ''
    );
  }

  showFeedback(message, type) {
    drinkFormFeedback.classList.add(type);
    drinkFormFeedback.innerText = message;
    setTimeout(() => {
      drinkFormFeedback.classList.remove(type);
      drinkFormFeedback.innerText = '';
    }, 3000);
  }

  clearFields() {
    inputName.value = '';
    inputLastName.value = '';
    inputEmail.value = '';
  }

  addCustomer({ name, lastName }) {
    drinkCardList.insertAdjacentHTML(
      'afterbegin',
      `
        <div class="person">
          <img
            src="https://via.placeholder.com/100"
            alt="${name} ${lastName}"
            class="person__thumbnail"
          />
          <h4 class="person__name">${name}</h4>
          <h4 class="person__last-name">${lastName}</h4>
        </div>
      `
    );
  }

  showModal(event) {
    event.preventDefault();
    if (event.target.parentElement.classList.contains('work-item__icon')) {
      const id = event.target.parentElement.dataset.id;
      workModal.style.display = 'grid';
      workModalItem.style.backgroundImage = `url(img/work-${id}.jpeg)`;
    }
  }

  closeModal() {
    return (workModal.style.display = 'none');
  }
}
