(() => {
  const messageForm = document.getElementById('message-form');
  const message = document.getElementById('message');
  const messageDisplay = document.getElementById('message-display');
  const alertHTML = `
    <div class="notification is-danger is-uppercase">
      <button class="delete" id="remove-notification"></button>
      please enter a value to pass
    </div>`;

  messageForm.addEventListener('submit', event => {
    event.preventDefault();
    if (message.value.trim() !== '') {
      messageDisplay.innerText = message.value;
      message.value = '';
    } else {
      messageForm.insertAdjacentHTML('afterend', alertHTML);
      message.value = '';
      const removeNotificationBtn = document.getElementById(
        'remove-notification'
      );
      removeNotificationBtn.addEventListener('click', () => {
        const notification = removeNotificationBtn.parentElement;
        notification.parentElement.removeChild(notification);
      });
    }
  });
})();
