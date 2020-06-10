/* eslint-disable import/extensions */
import UI from './classes/UI.js';

(() => {
  const ui = new UI();

  window.addEventListener('load', () => ui.hidePreloader());

  ui.navBtn.addEventListener('click', () => {
    ui.toggleNavIcon();
    ui.toggleNav();
  });

  ui.videoSwitch.addEventListener('click', () => ui.toggleVideo());

  ui.drinkForm.addEventListener('submit', event => {
    event.preventDefault();
    if (ui.hasEmptyValues()) {
      ui.showFeedback('please fill out all fields', 'error');
    } else {
      ui.addCustomer({
        name: ui.inputName.value.trim(),
        lastName: ui.inputLastName.value.trim(),
      });
      ui.showFeedback('success!', 'success');
      ui.clearFields();
    }
  });

  ui.workItemIcons.forEach(item =>
    item.addEventListener('click', event => ui.showModal(event))
  );

  ui.workModalClose.addEventListener('click', () => ui.closeModal());
})();
