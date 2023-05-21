const wrapper = document.getElementById('hoverboard__wrapper');
const colors = ['#00FFFF', '#9400D3', 'linear-gradient(to right, #FFD700, #FF7F00, #FF0000, #FF00FF, #0000FF, #00FF00)', '#FF4500', '#00FF7F']

const NUMBER_OF_BOXES = 500;

for (let index = 0; index < NUMBER_OF_BOXES; index++) {
  const box = document.createElement('div');
  box.classList.add('box');


  box.addEventListener('mouseover', () => setColor(box));
  box.addEventListener('mouseout', () => removeColor(box));
  wrapper.appendChild(box);
}

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];


function setColor(element) {
  const color = getRandomColor();
  element.style.backgroundColor = color;
  element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

function removeColor(element) {
  element.style.backgroundColor = '#dadada';
  element.style.boxShadow = '2px 2px 2px rgba(0, 0, 0, 0.3)';
}
