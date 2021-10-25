import { state } from "./settings";

const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting-text');
const inputName = document.querySelector('.name');

if (localStorage.getItem('webdev163-name')) {
  inputName.value = localStorage.getItem('webdev163-name');
}

showTime();

export function showTime() {
  time.textContent = new Date().toLocaleTimeString('ru-RU');
  showDate();
  greeting.textContent = getTimeOfDay();
  setTimeout(showTime, 1000);
}

export function showDate() {
  date.textContent = new Date().toLocaleDateString(state.language === 'english' ? 'en-US' : 'ru-RU', { weekday: 'long', month: 'long', day: 'numeric' });
}

export function getTimeOfDay() {
  const hours = new Date().getHours();
  if (hours < 6) {
    return state.language === 'english' ? 'Good night' : 'Доброй ночи';
  } else if (hours >= 6 && hours < 12) {
    return state.language === 'english' ? 'Good morning' : 'Доброе утро';
  } else if (hours >= 12 && hours < 18) {
    return state.language === 'english' ? 'Good afternoon' : 'Добрый день';
  } else {
    return state.language === 'english' ? 'Good evening' : 'Добрый вечер';
  }
}

function setLocalStorage() {
  localStorage.setItem('webdev163-name', inputName.value);
}

inputName.addEventListener('change', setLocalStorage);

