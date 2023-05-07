const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

let intervalId = null;

function colorChange() {
 startBtn.setAttribute('disabled', true);
 stopBtn.removeAttribute('disabled');
intervalId = setInterval(() => {
     const color = getRandomHexColor();
     bodyEl.style.backgroundColor = color;
   }, 1000);
}

function colorStop() {
 startBtn.removeAttribute('disabled');
 stopBtn.setAttribute('disabled', true);
 clearInterval(intervalId);
}

startBtn.addEventListener('click', colorChange);
stopBtn.addEventListener('click', colorStop);