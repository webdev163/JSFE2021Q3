import { showDate } from "./time";
import { showTime } from "./time";
import { getQuotes } from "./quotes";
import { getWeather } from "./weather";
import { updateDefaultCity } from "./weather";

const settingsIcon = document.querySelector('.settings-icon');
const settingsPopup = document.querySelector('.settings-popup');
const pictureSourceTitle = document.querySelector('.picture-source-title');
const languageTitle = document.querySelector('.language-title');
const popupClose = document.querySelector('.popup-close');
const overlay = document.querySelector('#overlay');
const unsplash = document.querySelector('#unsplash');
const flickr = document.querySelector('#flickr');
const photoTag = document.querySelector('#photo-tag');
const radioEnglish = document.querySelector('#english');
const radioRussian = document.querySelector('#russian');
const tagBtn = document.querySelector('.tag-btn');
const inputName = document.querySelector('.name');
const labelTime = document.querySelector('label[for="checkbox-time"]');
const labelDate = document.querySelector('label[for="checkbox-date"]');
const labelTag = document.querySelector('.custom-input-text');
const labelGreeting = document.querySelector('label[for="checkbox-greeting"]');
const labelQuotes = document.querySelector('label[for="checkbox-quotes"]');
const labelWeather = document.querySelector('label[for="checkbox-weather"]');
const labelAudio = document.querySelector('label[for="checkbox-audio"]');
const labelTodo = document.querySelector('label[for="checkbox-todo"]');
const todolistTitle = document.querySelector('.todolist-title');
const todolistBtn = document.querySelector('.new-todo-btn');
const todolistInput = document.querySelector('.new-todo');
const radioArr = Array.from(document.querySelectorAll('.custom-radio'));
const checkboxArr = Array.from(document.querySelectorAll('.slide-checkbox'));
const checkboxList = document.querySelectorAll('.slide-checkbox');
const languageList = document.querySelectorAll('.language-radio');
const formArr = radioArr.concat(checkboxArr);

export const state = {
  language: 'english',
  photoSource: 'github',
  tag: '',
  blocks: ['time', 'date', 'greeting', 'quotes', 'weather', 'audio', 'todo']
}

getLocalstorage();
updateState();
updateOpacity();
updateSettingsText();
updateGreetingPlaceholder();

function toggleActive() {
  if (settingsPopup.classList.contains('active')) {
    settingsPopup.classList.remove('active');
    overlay.classList.remove('active');
  } else {
    settingsPopup.classList.add('active');
    overlay.classList.add('active');
  }
}

function formCalculate() {
  disableInput();
  updateState();
}

export function updateState() {
  document.querySelectorAll('.language-radio').forEach(el => {
    if (el.checked) state.language = el.value;
  })
  document.querySelectorAll('.picture-radio').forEach(el => {
    if (el.checked) state.photoSource = el.value;
  })
  let newChekboxArr = [];
  checkboxList.forEach(el => {
    if (el.checked) {
      newChekboxArr.push(el.name);
    }
  })
  state.tag = photoTag.value;
  state.blocks = newChekboxArr;
}

function addOpacity(className) {
  document.getElementsByClassName(className)[0].classList.add('hidden')
}

function removeOpacity(className) {
  document.getElementsByClassName(className)[0].classList.remove('hidden')
}

function updateLocalstorage() {
  localStorage.setItem('webdev163-lang', state.language);
  localStorage.setItem('webdev163-photo-source', state.photoSource);
  localStorage.setItem('webdev163-photo-tag', state.tag);
  checkboxList.forEach(el => {
    if (el.checked) {
      localStorage.setItem(`webdev163-${el.name}`, '1');
    } else {
      localStorage.setItem(`webdev163-${el.name}`, '0');
    }
  })
  updateOpacity();
}

function getLocalstorage() {
  if (localStorage.getItem('webdev163-lang')) {
    document.getElementById(localStorage.getItem('webdev163-lang')).checked = true;
    setTimeout(() => {
      updateDefaultCity();
      getQuotes();
      getWeather();
    }, 400);
  }
  if (localStorage.getItem('webdev163-photo-source')) {
    document.getElementById(localStorage.getItem('webdev163-photo-source')).checked = true;
  }
  if (localStorage.getItem('webdev163-photo-tag')) {
    photoTag.value = localStorage.getItem('webdev163-photo-tag');
  }
  checkboxList.forEach(el => {
    if (localStorage.getItem(`webdev163-${el.name}`)) {
      if (localStorage.getItem(`webdev163-${el.name}`) === '1') {
        el.checked = true;
      } else {
        el.classList.add('hidden')
        el.checked = false;
      }
    } else {
      el.checked = true;
    }
  })
  disableInput();
}

function disableInput() {
  if (unsplash.checked || flickr.checked) {
    photoTag.disabled = false;
    tagBtn.disabled = false;
  } else {
    photoTag.value = '';
    photoTag.disabled = true;
    tagBtn.disabled = true;
  }
}

function updateOpacity() {
  checkboxList.forEach(el => {
    if (el.checked) {
      removeOpacity(el.name);
    } else {
      addOpacity(el.name);
    }
  })
}

function updateLang() {
  showDate();
  showTime();
  updateGreetingPlaceholder();
  updateSettingsText();
  getQuotes();
  getWeather();
  updateDefaultCity();
}

function updateGreetingPlaceholder() {
  inputName.placeholder = state.language === 'english' ? '[Enter name]' : '[Введите имя]';
}

function updateSettingsText() {
  labelTime.textContent = state.language === 'english' ? 'Time' : 'Время';
  labelDate.textContent = state.language === 'english' ? 'Date' : 'Дата';
  labelGreeting.textContent = state.language === 'english' ? 'Greeting' : 'Приветствие';
  labelQuotes.textContent = state.language === 'english' ? 'Quotes' : 'Цитаты';
  labelWeather.textContent = state.language === 'english' ? 'Weather' : 'Погода';
  labelAudio.textContent = state.language === 'english' ? 'Audio' : 'Аудиоплеер';
  labelTodo.textContent = state.language === 'english' ? 'Todo' : 'Список дел';
  labelTag.textContent = state.language === 'english' ? 'Tag' : 'Тег';
  pictureSourceTitle.textContent = state.language === 'english' ? 'Picture source:' : 'Источник фото:';
  languageTitle.textContent = state.language === 'english' ? 'Language:' : 'Язык:';
  todolistTitle.textContent = state.language === 'english' ? 'Todo list:' : 'Список дел:';
  todolistBtn.textContent = state.language === 'english' ? 'Add' : 'Добавить';
  todolistInput.placeholder = state.language === 'english' ? 'New todo' : 'Новая задача';
  radioEnglish.dataset.label = state.language === 'english' ? 'English' : 'Английский';
  radioRussian.dataset.label = state.language === 'english' ? 'Russian' : 'Русский';
}

settingsIcon.addEventListener('click', toggleActive);
popupClose.addEventListener('click', toggleActive);
overlay.addEventListener('click', toggleActive);
formArr.forEach(el => el.addEventListener('change', () => {
  formCalculate();
  updateLocalstorage();
}))
photoTag.addEventListener('change', () => {
  localStorage.setItem('webdev163-photo-tag', photoTag.value);
  state.tag = photoTag.value;
})
languageList.forEach(el => el.addEventListener('change', updateLang));