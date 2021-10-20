import { getTimeOfDay } from "./time";

const body = document.querySelector('body');
const slidePrev = document.querySelector('.slide-prev');
const slideNext= document.querySelector('.slide-next');

let randomNum = getRandomInt();
let animationActive = false;

function getRandomInt() {
  return Math.floor(Math.random() * 20) + 1;
}

function setBackground() {
  let timeOfDay = getTimeOfDay();
  if (randomNum < 10) randomNum = '0' + randomNum;
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/webdev163/stage1-tasks/assets/images/${timeOfDay}/${randomNum}.jpg`;
  img.addEventListener('load', () => {
    body.style.backgroundImage = `url(${img.src})`;
  })
}

function getSlideNext() {
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