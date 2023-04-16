import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
 import convertMs  from "./dateConvert";

const btnStart = document.querySelector('[data-start]');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const min = document.querySelector('[data-minutes]');
const sec = document.querySelector('[data-seconds]');
const datePicker = document.querySelector('#datetime-picker');
const spans = document.querySelectorAll('.value');
const digitalClock = document.querySelector('.timer');
let timerId = null;
btnStart.disabled = true;

flatpickr(datePicker, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
Notiflix.Notify.failure('Please choose a date in the future');
btnStart.disabled = true;
    } else {
        btnStart.disabled = false; 
        Notiflix.Notify.success('Set off')
    }
    console.log(selectedDates[0]);
  },
});

btnStart.addEventListener('click', onStartClick);

function onStartClick() {
 spans.forEach(item => item.classList.toggle('end'));
 btnStart.disabled = true;
 datePicker.disabled = true;
 timerId = setInterval(() => {
    const selectedDate = new Date(datePicker.value);
    const timeToEnd = selectedDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(timeToEnd);
    
     const formatTime = `${addLeadingZero(days)}days : ${addLeadingZero(hours)}hours : ${addLeadingZero(minutes)}minutes : ${addLeadingZero(seconds)}seconds`;

    day.textContent = addLeadingZero(days);
    hour.textContent = addLeadingZero(hours);
    min.textContent = addLeadingZero(minutes);
    sec.textContent = addLeadingZero(seconds);

    digitalClock.textContent = `Countdown: ${formatTime}`;

    if (timeToEnd < 1000) {
        spans.forEach(item => item.classList.toggle('end'));
        clearInterval(timerId);
        datePicker.disabled = false;
    }

 }, 1000);
}

function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}

digitalClock.style.display ="flex";
digitalClock.style.gap = "15px";
digitalClock.style.color = "green";
digitalClock.style.fontWeight = 900;
document.body.style.background = "pink";
document.body.style.fontSize = "25px";
