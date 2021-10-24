import { state } from "./settings";
import { updateState } from "./settings";

const body = document.querySelector('body');
const slidePrev = document.querySelector('.slide-prev');
const slideNext= document.querySelector('.slide-next');
const radioArr = document.querySelectorAll('.picture-radio');
const photoTag = document.querySelector('#photo-tag');
const tagBtn = document.querySelector('.tag-btn');
const spinner = document.getElementById('spinner');

let randomNum = getRandomInt(20);
let animationActive = false;

updateState();

function getRandomInt(num) {
  return Math.floor(Math.random() * num) + 1;
}

function getTimeOfDay() {
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

async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 10000 } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal
  });
  clearTimeout(id);
  return response;
}

async function setBackground() {
  let query;
  if (randomNum < 10) randomNum = '0' + randomNum;
  const img = new Image();
  spinner.removeAttribute('hidden');
  if (state.photoSource === 'github') {
    query = getTimeOfDay();
    img.src = `https://raw.githubusercontent.com/webdev163/stage1-tasks/assets/images/${query}/${randomNum}.jpg`;
  } else if (state.photoSource === 'unsplash') {
    query = state.tag || getTimeOfDay();
    if (query === 'afternoon') query = 'sunshine landscape';
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${query}&client_id=tQ4AR9GqgQmyJo8WFLEQQNjKvyKRa3buUFH4C-15afo`;
    try {
      const response = await fetchWithTimeout(url, {
        timeout: 15000
      });
      const data = await response.json();
      img.src = data.urls.regular;
    } catch (error) {
      returnError();
    }
  } else if (state.photoSource === 'flickr') {
    query = state.tag || getTimeOfDay();
    switch (query) {
      case 'night':
        const urlNight = 'https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=c0496d81a8a69bb277aa09687219e8d6&gallery_id=72157716112022706&extras=url_h&format=json&nojsoncallback=1';
        try {
          const response = await fetchWithTimeout(urlNight, {
            timeout: 15000
          });
          const data = await response.json();
          const arr = data.photos.photo.filter(el => el.url_h);
          const flickrRandom = getRandomInt(arr.length - 1);
          img.src = arr[flickrRandom].url_h;
        } catch (error) {
          returnError();
        }
        break;
      case 'morning':
        const urlMorning = 'https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=c0496d81a8a69bb277aa09687219e8d6&gallery_id=72157648788051370&extras=url_h&format=json&nojsoncallback=1';
        try {
          const response = await fetchWithTimeout(urlMorning, {
            timeout: 15000
          });
          const data = await response.json();
          const arr = data.photos.photo.filter(el => el.url_h);
          const flickrRandom = getRandomInt(arr.length - 1);
          img.src = arr[flickrRandom].url_h;
        } catch (error) {
          returnError();
        }
        break;
      case 'afternoon':
        const urlAfternoon = 'https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=c0496d81a8a69bb277aa09687219e8d6&gallery_id=72157720111881805&extras=url_h&format=json&nojsoncallback=1';
        try {
          const response = await fetchWithTimeout(urlAfternoon, {
            timeout: 15000
          });
          const data = await response.json();
          const arr = data.photos.photo.filter(el => el.url_h);
          const flickrRandom = getRandomInt(arr.length - 1);
          img.src = arr[flickrRandom].url_h;
        } catch (error) {
          returnError();
        }
        break;
      case 'evening':
        const urlEvening = 'https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=c0496d81a8a69bb277aa09687219e8d6&gallery_id=72157720111880160&extras=url_h&format=json&nojsoncallback=1';
        try {
          const response = await fetchWithTimeout(urlEvening, {
            timeout: 15000
          });
          const data = await response.json();
          const arr = data.photos.photo.filter(el => el.url_h);
          const flickrRandom = getRandomInt(arr.length - 1);
          img.src = arr[flickrRandom].url_h;
        } catch (error) {
          returnError();
        }
        break;
      default:
        const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=c0496d81a8a69bb277aa09687219e8d6&tags=${query}&extras=url_h&format=json&nojsoncallback=1`;
        try {
          const response = await fetchWithTimeout(url, {
            timeout: 15000
          });
          const data = await response.json();
          const arr = data.photos.photo.filter(el => el.url_h);
          const flickrRandom = getRandomInt(arr.length - 1);
          img.src = arr[flickrRandom].url_h;
        } catch (error) {
          returnError();
        }
        break;
    }
  }
  img.addEventListener('load', () => {
    setTimeout(() => {
      spinner.setAttribute('hidden', '');
    }, 500);
    body.style.backgroundImage = `url(${img.src})`;
  })
}

export function getSlideNext() {
  randomNum++;
  if (randomNum > 20) randomNum = 1;
  setBackground();
  setTimeout(() => {
    animationActive = false;
  }, 1000);
}

function getSlidePrev() {
  randomNum--;
  if (randomNum < 1) randomNum = 20;
  setBackground();
  setTimeout(() => {
    animationActive = false;
  }, 1000);
}

function returnError() {
  spinner.setAttribute('hidden', '');
  alert(`Соединение прервано, если вы запрашиваете Unsplash, то скорее всего превышен лимит запросов к API. Попробуйте повторить через ${60 - Math.round(new Date() % 3.6e6 / 6e4)} минут(-ы). Если вы запрашиваете Flickr, повторите через пару минут (иногда этот API не работает)`);
}

setBackground();



slideNext.addEventListener('click', () => {
  if (!animationActive) {
    animationActive = true;
    getSlideNext();
  } 
});
slidePrev.addEventListener('click', () => {
  if (!animationActive) {
    animationActive = true;
    getSlidePrev();
  } 
});

radioArr.forEach(el => el.addEventListener('change', getSlideNext));
photoTag.addEventListener('change', getSlideNext);
tagBtn.addEventListener('change', getSlideNext);