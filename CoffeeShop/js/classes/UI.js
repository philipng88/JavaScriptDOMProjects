export default class UI {
  constructor() {
    this.preloader = document.getElementById('preloader');
    this.nav = document.getElementById('nav');
    this.navIcon = document.getElementById('navBtn').firstElementChild;
    this.videoSwitchBtn = document.getElementById('videoSwitchBtn');
    this.videoItem = document.getElementById('videoItem');
    this.inputName = document.getElementById('inputName');
    this.inputLastName = document.getElementById('inputLastName');
    this.inputEmail = document.getElementById('inputEmail');
    this.drinkFormFeedback = document.getElementById('drinkFormFeedback');
    this.drinkCardList = document.getElementById('drinkCardList');
    this.workModal = document.getElementById('workModal');
    this.workModalItem = document.getElementById('workModalItem');
  }

  hidePreloader() {
    this.preloader.style.display = 'none';
  }

  toggleNav() {
    this.nav.classList.toggle('nav--show');
  }

  toggleNavIcon() {
    if (this.navIcon.classList.contains('fa-bars')) {
      this.navIcon.classList.remove('fa-bars');
      this.navIcon.classList.add('fa-times');
    } else if (this.navIcon.classList.contains('fa-times')) {
      this.navIcon.classList.remove('fa-times');
      this.navIcon.classList.add('fa-bars');
    }
  }

  toggleVideo() {
    if (this.videoSwitchBtn.classList.contains('btnSlide')) {
      this.videoSwitchBtn.classList.remove('btnSlide');
      this.videoItem.play();
    } else {
      this.videoSwitchBtn.classList.add('btnSlide');
      this.videoItem.pause();
    }
  }

  hasEmptyValues() {
    return (
      this.inputName.value.trim() === '' ||
      this.inputLastName.value.trim() === '' ||
      this.inputEmail.value.trim() === ''
    );
  }

  showFeedback(message, type) {
    this.drinkFormFeedback.classList.add(type);
    this.drinkFormFeedback.innerText = message;
    setTimeout(() => {
      this.drinkFormFeedback.classList.remove(type);
      this.drinkFormFeedback.innerText = '';
    }, 3000);
  }

  clearFields() {
    this.inputName.value = '';
    this.inputLastName.value = '';
    this.inputEmail.value = '';
  }

  addCustomer({ name, lastName }) {
    this.drinkCardList.insertAdjacentHTML(
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
      // eslint-disable-next-line prefer-destructuring
      const id = event.target.parentElement.dataset.id;
      this.workModal.style.display = 'grid';
      this.workModalItem.style.backgroundImage = `url(img/work-${id}.jpeg)`;
    }
  }

  closeModal() {
    this.workModal.style.display = 'none';
  }
}
