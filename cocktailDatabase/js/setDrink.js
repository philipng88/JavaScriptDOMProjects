const setDrink = section => {
  section.addEventListener('click', event => {
    const { id } = event.target.parentElement.dataset;
    localStorage.setItem('drink', id);
  });
};

export default setDrink;
