const dataStart = document.querySelector('[data-start]');
const dataStop = document.querySelector('[data-stop]');
const bodyColor = document.querySelector('body');

let timerId = null;

 function getRandomHexColor() {
     return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

dataStart.addEventListener('click', onStart);
dataStop.addEventListener('click', onStop);

function getBgColor() {
    bodyColor.style.backgroundColor =getRandomHexColor();
}
function onStart() {
    timerId = setInterval(getBgColor, 1000);
    dataStart.toggleAttribute('disabled');
}

function onStop() {
    clearInterval(timerId);
    dataStart.removeAttribute('disabled');
}

