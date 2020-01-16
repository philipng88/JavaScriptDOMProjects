(() => {
  const btn = document.getElementById('btn');
  const hexValue = document.getElementById('hex-value');

  const createHex = () => {
    // const hexChars = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
    // let randomColor = '#';
    // for (let i = 0; i < 6; i++) {
    //   let randomChar = Math.floor(Math.random() * hexChars.length);
    //   randomColor += hexChars[randomChar];
    // }
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    document.body.style.backgroundColor = randomColor;
    hexValue.innerText = randomColor;
  };

  btn.addEventListener('click', createHex);
})();
