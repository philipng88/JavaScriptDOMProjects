function UI() {}

UI.prototype.hidePreloader = () =>
  (document.querySelector('.preloader').style.display = 'none');

UI.prototype.toggleNav = () =>
  document.querySelector('.nav').classList.toggle('nav--show');

UI.prototype.toggleNavIcon = () => {
  const navIcon = document.querySelector('.navBtn').firstElementChild;
  if (navIcon.classList.contains('fa-bars')) {
    navIcon.classList.remove('fa-bars');
    navIcon.classList.add('fa-times');
  } else if (navIcon.classList.contains('fa-times')) {
    navIcon.classList.remove('fa-times');
    navIcon.classList.add('fa-bars');
  }
};

UI.prototype.toggleVideo = () => {
  const btn = document.querySelector('.video__switch-btn');
  if (btn.classList.contains('btnSlide')) {
    btn.classList.remove('btnSlide');
    document.querySelector('.video__item').play();
  } else {
    btn.classList.add('btnSlide');
    document.querySelector('.video__item').pause();
  }
};

UI.prototype.hasEmptyValues = (name, lastname, email) =>
  name.trim() === '' || lastname.trim() === '' || email.trim() === ''
    ? true
    : false;

UI.prototype.showFeedback = function(message, type) {
  const feedback = document.querySelector('.drink-form__feedback');
  if (type === 'success') {
    feedback.classList.add('success');
    feedback.innerText = message;
    this.removeAlert('success');
  } else if (type === 'error') {
    feedback.classList.add('error');
    feedback.innerText = message;
    this.removeAlert('error');
  }
};

UI.prototype.removeAlert = type =>
  setTimeout(
    () =>
      document.querySelector('.drink-form__feedback').classList.remove(type),
    3000
  );

UI.prototype.clearFields = () => {
  document.querySelector('.input-name').value = '';
  document.querySelector('.input-lastname').value = '';
  document.querySelector('.input-email').value = '';
};

UI.prototype.addCustomer = customer => {
  document.querySelector('.drink-card__list').insertAdjacentHTML(
    'afterbegin',
    `
    <div class="person">
      <img
        src="https://via.placeholder.com/100"
        alt="${customer.name} ${customer.lastName}"
        class="person__thumbnail"
      />
      <h4 class="person__name">${customer.name}</h4>
      <h4 class="person__last-name">${customer.lastName}</h4>
    </div>
  `
  );
};

UI.prototype.showModal = event => {
  event.preventDefault();
  if (event.target.parentElement.classList.contains('work-item__icon')) {
    const id = event.target.parentElement.dataset.id;
    const modal = document.querySelector('.work-modal');
    const modalItem = document.querySelector('.work-modal__item');
    modal.style.display = 'grid';
    modalItem.style.backgroundImage = `url(img/work-${id}.jpeg)`;
  }
};

UI.prototype.closeModal = () =>
  (document.querySelector('.work-modal').style.display = 'none');

function Customer(name, lastName) {
  this.name = name.trim();
  this.lastName = lastName.trim();
}

const eventListeners = () => {
  const ui = new UI();
  window.addEventListener('load', () => ui.hidePreloader());
  document.querySelector('.navBtn').addEventListener('click', () => {
    ui.toggleNavIcon();
    ui.toggleNav();
  });
  document
    .querySelector('.video__switch')
    .addEventListener('click', () => ui.toggleVideo());
  document.querySelector('.drink-form').addEventListener('submit', event => {
    event.preventDefault();
    const name = document.querySelector('.input-name').value;
    const lastName = document.querySelector('.input-lastname').value;
    const email = document.querySelector('.input-email').value;
    const hasEmptyValues = ui.hasEmptyValues(name, lastName, email);
    if (hasEmptyValues) {
      ui.showFeedback('please fill out all fields', 'error');
    } else {
      const customer = new Customer(name, lastName);
      ui.addCustomer(customer);
      ui.showFeedback('success!', 'success');
      ui.clearFields();
    }
  });
  document
    .querySelectorAll('.work-item__icon')
    .forEach(item =>
      item.addEventListener('click', event => ui.showModal(event))
    );
  document
    .querySelector('.work-modal__close')
    .addEventListener('click', () => ui.closeModal());
};

eventListeners();
