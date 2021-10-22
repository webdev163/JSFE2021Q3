const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting-text');
const inputName = document.querySelector('.name');

showTime();

function showTime() {
  time.textContent = new Date().toLocaleTimeString();
  showDate();
  greeting.textContent = `Good ${getTimeOfDay()}`;
  setTimeout(showTime, 1000);
}

function showDate() {
  date.textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

export function getTimeOfDay() {
  const hours = new Date().getHours();
  if (hours < 6) {
    return 'night';
  } else if (hours >= 6 && hours < 12) {
    return 'morning';
  } else if (hours >= 12 && hours < 18) {
    return 'afternoon';
  } else {
    return 'evening';
  }
}

function setLocalStorage() {
  localStorage.setItem('webdev163-name', inputName.value);
}

function getLocalStorage() {
  if (localStorage.getItem('webdev163-name')) {
    inputName.value = localStorage.getItem('webdev163-name');
  }
}

window.addEventListener('load', getLocalStorage);
window.addEventListener('beforeunload', setLocalStorage);

