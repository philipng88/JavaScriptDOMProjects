const tabButtons = document.querySelectorAll('.tab-btn');
const aboutContainer = document.getElementById('aboutContainer');
const contentWrappers = document.querySelectorAll('.content');

aboutContainer.addEventListener('click', event => {
  // eslint-disable-next-line prefer-destructuring
  const id = event.target.dataset.id;
  if (id) {
    tabButtons.forEach(tabButton => {
      tabButton.classList.remove('active');
      event.target.classList.add('active');
    });
    contentWrappers.forEach(contentWrapper =>
      contentWrapper.classList.remove('active')
    );
    document.getElementById(id).classList.add('active');
  }
});
