const inputName = document.querySelector('.input-name');
const inputMail = document.querySelector('.input-mail');
const inputTel = document.querySelector('.input-tel');
const errorName = document.querySelector('.error-name');
const errorMail = document.querySelector('.error-email');
const errorTel = document.querySelector('.error-tel');

let nameValid = false;
let emailValid = false;
let telValid = false;

inputName.addEventListener('input', () => {
  let regex = new RegExp(/^[a-zA-Zа-яА-Я\s]{3,15}$/)
  if (regex.test(inputName.value)) {
    removeStyles(inputName, errorName);
    nameValid = true;
  } else {
    addStyles(inputName, errorName);
  }
})

inputMail.addEventListener('input', () => {
  let regex = new RegExp(/^[a-z\d_-]{3,15}\@[a-z]{4,}\.[a-z]{2,}$/);
  if (regex.test(inputMail.value)) {
    removeStyles(inputMail, errorMail);
    emailValid = true;
  } else {
    addStyles(inputMail, errorMail);
  }
})

inputTel.addEventListener('input', () => {
  let regex1 = new RegExp(/^[\d]{2,3}[-\s\0][\d]{2,3}[-\s\0][\d]{2,3}[-\s\0][\d]{2,3}[-\s\0][\d]{2,3}$/);
  let regex2 = new RegExp(/^[\d]{2,3}[-\s\0][\d]{2,3}[-\s\0][\d]{2,3}[-\s\0][\d]{2,3}$/);
  let regex3 = new RegExp(/^[\d]{10}$/);
  if ((regex1.test(inputTel.value) && inputTel.value.match(/\d/g).length === 10) || (regex2.test(inputTel.value) && inputTel.value.match(/\d/g).length === 10) || regex3.test(inputTel.value) ) {
    removeStyles(inputTel, errorTel);
    telValid = true;
  } else {
    addStyles(inputTel, errorTel);
  }
})

function addStyles (el, msg) {
  el.style.outline = '1px solid red';
  el.style.border = '1px solid red';
  msg.style.display = 'block';
}

function removeStyles (el, msg) {
  el.style.outline = '1px solid green';
  el.style.border = '1px solid green';
  msg.style.display = 'none';
}