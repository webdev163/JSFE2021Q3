import { state } from "./settings";
import { updateState } from "./settings";

const body = document.querySelector('body');
const slidePrev = document.querySelector('.slide-prev');
const slideNext= document.querySelector('.slide-next');
const radioArr = document.querySelectorAll('.picture-radio');
const photoTag = document.querySelector('#photo-tag');

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

function setBackground() {
  let query;
  if (randomNum < 10) randomNum = '0' + randomNum;
  const img = new Image();
  if (state.photoSource === 'github') {
    query = getTimeOfDay();
    img.src = `https://raw.githubusercontent.com/webdev163/stage1-tasks/assets/images/${query}/${randomNum}.jpg`;
  } else if (state.photoSource === 'unsplash') {
    query = state.tag || getTimeOfDay();
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${query}&client_id=tQ4AR9GqgQmyJo8WFLEQQNjKvyKRa3buUFH4C-15afo`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        img.src = data.urls.regular;
      });
  } else if (state.photoSource === 'flickr') {
    query = state.tag || getTimeOfDay();
    switch (query) {
      case 'night':
        const urlNight = 'https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=c0496d81a8a69bb277aa09687219e8d6&gallery_id=72157716112022706&extras=url_h&format=json&nojsoncallback=1';
        fetch(urlNight)
          .then(res => res.json())
          .then(data => {
            const arr = data.photos.photo.filter(el => el.url_h);
            const flickrRandom = getRandomInt(arr.length - 1);
            img.src = arr[flickrRandom].url_h;
          });
        break;
      case 'morning':
        const urlMorning = 'https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=c0496d81a8a69bb277aa09687219e8d6&gallery_id=72157648788051370&extras=url_h&format=json&nojsoncallback=1';
        fetch(urlMorning)
          .then(res => res.json())
          .then(data => {
            const arr = data.photos.photo.filter(el => el.url_h);
            const flickrRandom = getRandomInt(arr.length - 1);
            img.src = arr[flickrRandom].url_h;
          });
        break;
      case 'afternoon':
        const urlAfternoon = 'https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=c0496d81a8a69bb277aa09687219e8d6&gallery_id=72157719866145947&extras=url_h&format=json&nojsoncallback=1';
        fetch(urlAfternoon)
          .then(res => res.json())
          .then(data => {
            const arr = data.photos.photo.filter(el => el.url_h);
            const flickrRandom = getRandomInt(arr.length - 1);
            img.src = arr[flickrRandom].url_h;
          });
        break;
      case 'evening':
        const urlEvening = 'https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=c0496d81a8a69bb277aa09687219e8d6&gallery_id=72157622998668980&extras=url_h&format=json&nojsoncallback=1';
        fetch(urlEvening)
          .then(res => res.json())
          .then(data => {
            const arr = data.photos.photo.filter(el => el.url_h);
            const flickrRandom = getRandomInt(arr.length - 1);
            img.src = arr[flickrRandom].url_h;
          });
        break;
      default:
        const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=c0496d81a8a69bb277aa09687219e8d6&tags=${query}&extras=url_h&format=json&nojsoncallback=1`;
        fetch(url)
          .then(res => res.json())
          .then(data => {
            const arr = data.photos.photo.filter(el => el.url_h);
            const flickrRandom = getRandomInt(arr.length - 1);
            img.src = arr[flickrRandom].url_h;
          });
        break;
    }
  }
  img.addEventListener('load', () => {
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