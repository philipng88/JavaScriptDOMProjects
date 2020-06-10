/* eslint-disable import/extensions */
import UI from './classes/UI.js';

const navBtn = document.getElementById('navBtn');
const videoSwitch = document.getElementById('videoSwitch');
const drinkForm = document.getElementById('drinkForm');
const inputName = document.getElementById('inputName');
const inputLastName = document.getElementById('inputLastName');
const workItemIcons = document.querySelectorAll('.work-item__icon');
const workModalClose = document.getElementById('workModalClose');

(() => {
  const ui = new UI();

  window.addEventListener('load', () => ui.hidePreloader());

  navBtn.addEventListener('click', () => {
    ui.toggleNavIcon();
    ui.toggleNav();
  });

  videoSwitch.addEventListener('click', () => ui.toggleVideo());

  drinkForm.addEventListener('submit', event => {
    event.preventDefault();
    if (ui.hasEmptyValues()) {
      ui.showFeedback('please fill out all fields', 'error');
    } else {
      ui.addCustomer({
        name: inputName.value.trim(),
        lastName: inputLastName.value.trim(),
      });
      ui.showFeedback('success!', 'success');
      ui.clearFields();
    }
  });

  workItemIcons.forEach(item =>
    item.addEventListener('click', event => ui.showModal(event))
  );

  workModalClose.addEventListener('click', () => ui.closeModal());
})();
