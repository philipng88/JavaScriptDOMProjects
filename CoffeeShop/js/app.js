import UI from './classes/UI.js';
import {
  navBtn,
  videoSwitch,
  drinkForm,
  inputName,
  inputLastName,
  workItemIcons,
  workModalClose,
} from './selectors.js';

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
