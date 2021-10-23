const settingsIcon = document.querySelector('.settings-icon');
const settingsPopup = document.querySelector('.settings-popup');
const popupClose = document.querySelector('.popup-close');
const overlay = document.querySelector('#overlay');
const github = document.querySelector('#github');
const unsplash = document.querySelector('#unsplash');
const flickr = document.querySelector('#flickr');
const photoTag = document.querySelector('#photo-tag');
const radioArr = Array.from(document.querySelectorAll('.custom-radio'));
const checkboxArr = Array.from(document.querySelectorAll('.slide-checkbox'));
const checkboxList = document.querySelectorAll('.slide-checkbox');
const formArr = radioArr.concat(checkboxArr);

export const state = {
  language: 'english',
  photoSource: 'github',
  tag: '',
  blocks: ['time', 'date', 'greeting', 'quotes', 'weather', 'audio']
}

getLocalstorage();
updateOpacity();

// const proxyState = new Proxy(state, {
//   set: function () {
//     getSlideNext();
//   }
// });

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
  } else {
    photoTag.value = '';
    photoTag.disabled = true;
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