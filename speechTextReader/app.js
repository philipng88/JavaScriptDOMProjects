const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const feelings = [
  'angry',
  'bored',
  'confident',
  'confused',
  'furious',
  'happy',
  'indifferent',
  'joyful',
  'sad',
  'silly',
  'sleepy',
  'surprised',
];

const data = [];
const message = new SpeechSynthesisUtterance();
let voices = [];

const getVoices = () => {
  voices = speechSynthesis.getVoices();
  voices.forEach(voice => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.innerText = `${voice.name} (${voice.lang})`;
    voicesSelect.appendChild(option);
  });
};

const setVoice = event =>
  (message.voice = voices.find(voice => voice.name === event.target.value));
const setTextMessage = text => (message.text = text);
const speakText = () => speechSynthesis.speak(message);

feelings.forEach(feeling =>
  data.push({ image: `./images/${feeling}.png`, text: `I feel ${feeling}` })
);

data.forEach(({ image, text }) => {
  const box = document.createElement('div');
  box.classList.add('box');
  box.innerHTML = `
    <img class='o-image' src=${image} alt=${text}>
    <p class='info'>${text}</p>
  `;
  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });
  main.appendChild(box);
});

speechSynthesis.addEventListener('voiceschanged', getVoices);

toggleBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.toggle('show')
);

closeBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.remove('show')
);

voicesSelect.addEventListener('change', setVoice);

readBtn.addEventListener('click', () => {
  if (textarea.value.trim() !== '') {
    setTextMessage(textarea.value);
    speakText();
  } else {
    alert('Please enter text to read');
  }
});

getVoices();
