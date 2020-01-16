(() => {
  const pictures = [
    'contBcg-0.jpeg',
    'contBcg-1.jpeg',
    'contBcg-2.jpeg',
    'contBcg-3.jpeg',
    'contBcg-4.jpeg'
  ];
  let counter = 0;
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      if (
        event.target.classList.contains('btn-left') ||
        event.target.classList.contains('fa-caret-left')
      ) {
        counter--;
        if (counter < 0) counter = pictures.length - 1;
        document.querySelector(
          '.img-container'
        ).style.backgroundImage = `url('img/${pictures[counter]}')`;
      }
      if (
        event.target.classList.contains('btn-right') ||
        event.target.classList.contains('fa-caret-right')
      ) {
        counter++;
        if (counter > pictures.length - 1) counter = 0;
        document.querySelector(
          '.img-container'
        ).style.backgroundImage = `url('img/${pictures[counter]}')`;
      }
    });
  });
})();
