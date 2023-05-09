import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const calendar = document.getElementById("datetime-picker");


const refs = {
 startBtn: document.querySelector("button[data-start]"),
 daysSpan: document.querySelector("span[data-days]"),
 hrsSpan: document.querySelector("span[data-hours]"),
 minSpan: document.querySelector("span[data-minutes]"),
 secSpan: document.querySelector("span[data-seconds]"),
}

refs.startBtn.setAttribute("disabled", "")

let chosenDate;
const options = {
 enableTime: true,
 time_24hr: true,
 defaultDate: new Date(),
 minuteIncrement: 1,
 onClose(selectedDates) {
   chosenDate = selectedDates[0];
   if (chosenDate > new Date()) {
    refs.startBtn.removeAttribute("disabled")
   } else {
    Notiflix.Notify.failure("Please choose a date in the future")
   }
 },
};

flatpickr(calendar, options)

let timer;

const handleTime = (targetDate) => {
 const now = new Date()
 const distance = targetDate - now;

 if (distance <= 0) {
  clearInterval(timer);
  return;
 }

 function addLeadingZero(value) {
  return String(value).padStart(2, "0");
 }

 const { days, hours, minutes, seconds } = convertMs(distance);

 refs.daysSpan.textContent = addLeadingZero(days)
 refs.hrsSpan.textContent = addLeadingZero(hours)
 refs.minSpan.textContent = addLeadingZero(minutes)
 refs.secSpan.textContent = addLeadingZero(seconds)
}

const startTimer = () => {
 if (!chosenDate) {
  return;
 }

 clearInterval(timer);
 timer = setInterval(() => handleTime(chosenDate), 1000);
};

refs.startBtn.addEventListener("click", () => {
  startTimer();
  refs.startBtn.disabled = true; 
 });
 
 function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
 
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
 
  return { days, hours, minutes, seconds };
 }
