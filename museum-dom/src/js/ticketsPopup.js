const btn = document.querySelector('.buy-button');
const popup = document.querySelector('.tickets-popup');
const closeBtn = document.querySelector('.popup-close');
const overlay = document.querySelector('#overlay');
const elArr = [popup, overlay];

function toggleActive() {
  elArr.forEach((el) => el.classList.toggle('active'));
}


btn.addEventListener('click', toggleActive);
closeBtn.addEventListener('click', toggleActive);
overlay.addEventListener('click', toggleActive);
