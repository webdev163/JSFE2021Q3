const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const inputName = document.querySelector('.name');

showTime();

function showTime() {
  time.textContent = new Date().toLocaleTimeString(undefined, { hour12: false });
  showDate();
  getGreeting();
  setTimeout(showTime, 1000);
}

function showDate() {
  date.textContent = new Date().toLocaleDateString('ru-RU', { weekday: 'long', month: 'long', day: 'numeric' });
}

function getGreeting() {
  const hours = new Date().getHours();
  let greetingText = '';
  if (hours < 6) {
    greetingText = 'night';
  } else if (hours >= 6 && hours < 12) {
    greetingText = 'morning';
  } else if (hours >= 12 && hours < 18) {
    greetingText = 'day';
  } else {
    greetingText = 'evening';
  }
  greeting.textContent = `Good ${greetingText}`;
}

function setLocalStorage() {
  localStorage.setItem('name', inputName.value);
}

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    inputName.value = localStorage.getItem('name');
  }
}

window.addEventListener('load', getLocalStorage);
window.addEventListener('beforeunload', setLocalStorage);

