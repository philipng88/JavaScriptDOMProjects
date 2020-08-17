const loading = document.getElementById('loading');

// eslint-disable-next-line consistent-return
const fetchDrinks = async url => {
  loading.classList.remove('hide');
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export default fetchDrinks;
