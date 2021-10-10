const radios = document.getElementsByName('ticket-type');
const basic = document.querySelector('.basic-number');
const senior = document.querySelector('.senior-number');
const minusBtnBasic = document.querySelectorAll('.minus-button-basic');
const plusBtnBasic = document.querySelectorAll('.plus-button-basic');
const minusBtnSenior = document.querySelectorAll('.minus-button-senior');
const plusBtnSenior = document.querySelectorAll('.plus-button-senior');
const options = document.querySelectorAll('#select-ticket option');
const total = document.querySelector('.total-price');
const formTotal = document.querySelector('.form-total-price');
const formBasic = document.querySelector('.form-ticket-basic');
const formSenior = document.querySelector('.form-ticket-senior');
const formBasicNumber = document.querySelector('.form-basic-number');
const formSeniorNumber = document.querySelector('.form-senior-number');
const formBasicTitle = document.querySelector('.form-basic-title');
const formSeniorTitle = document.querySelector('.form-senior-title');
const formBasicSubtotal = document.querySelector('.form-basic-subtotal');
const formSeniorSubtotal = document.querySelector('.form-senior-subtotal');
const formOverviewType = document.querySelector('.overview-type');
const formTicketSelect = document.querySelector('.select-ticket-type');
const inputDate = document.querySelector('.input-date');
const overviewDate = document.querySelector('.overview-date');

let selectedRadio;
let basicPrice;
let seniorPrice;

// date and time

let today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;
inputDate.setAttribute('min', today);

// retrieve from localstorage
if (localStorage.getItem('webdev163-basic') !== null) {
  basic.value = parseInt(localStorage.getItem('webdev163-basic'));
} else {
  basic.value = 0;
}
if (localStorage.getItem('webdev163-senior') !== null) {
  senior.value = parseInt(localStorage.getItem('webdev163-senior'));
} else {
  senior.value = 0;
}
if (localStorage.getItem('webdev163-type') !== null) {
  selectedRadio = parseInt(localStorage.getItem('webdev163-type'));
  radios[selectedRadio].checked = true;
  options[selectedRadio + 1].selected = true;
} else {
  selectedRadio = 0;
}

calculateTotal();

function calculateTotal() {
  switch (selectedRadio) {
    case 0:
      basicPrice = 20;
      seniorPrice = 10;
      break;
    case 1:
      basicPrice = 25;
      seniorPrice = 12.5;
      break;
    case 2:
      basicPrice = 40;
      seniorPrice = 20;
      break;
  }

  formBasicNumber.value = basic.value;
  formSeniorNumber.value = senior.value;
  const result = (basic.value * basicPrice) + (senior.value * seniorPrice);

  // update html
  total.innerHTML = result
  formTotal.innerHTML = result + ' €'
  formBasic.innerHTML = basic.value;
  formSenior.innerHTML = senior.value;
  formBasicTitle.innerHTML = `Basic (${basicPrice} €)`;
  formSeniorTitle.innerHTML = `Senior (${seniorPrice} €)`;
  formBasicSubtotal.innerHTML = `${basic.value * basicPrice} €`;
  formSeniorSubtotal.innerHTML = `${senior.value * seniorPrice} €`;
  formOverviewType.innerHTML = selectedRadio === 0 ? 'Permanent exhibition' : selectedRadio === 1 ? 'Temporary exhibition' : 'Combined Admission';
  overviewDate.innerHTML = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  // set to localstorsge
  localStorage.setItem('webdev163-basic', basic.value);
  localStorage.setItem('webdev163-senior', senior.value);
  localStorage.setItem('webdev163-type', selectedRadio);
}

// event listeners
minusBtnBasic.forEach(el => el.addEventListener('click', () => {
  basic.value--;
  if (basic.value < 0) basic.value = 0;
  calculateTotal();
}))
plusBtnBasic.forEach(el => el.addEventListener('click', () => {
  basic.value++;
  if (basic.value > 20) basic.value = 20;
  calculateTotal();
}))
minusBtnSenior.forEach(el => el.addEventListener('click', () => {
  senior.value--;
  if (senior.value < 0) senior.value = 0;
  calculateTotal();
}))
plusBtnSenior.forEach(el => el.addEventListener('click', () => {
  senior.value++;
  if (senior.value > 20) senior.value = 20;
  calculateTotal();
}))
radios.forEach((el, ndx) => {
  el.addEventListener('click', () => {
    selectedRadio = ndx;
    options[selectedRadio + 1].selected = true;
    calculateTotal();
  });
});
formTicketSelect.addEventListener('change', () => {
  for (let i = 0; i < options.length; i++) {
    if (options[i].selected) {
      radios[i - 1].checked = true;
      selectedRadio = i - 1;
      break;
    }
  }
  calculateTotal();
})
inputDate.addEventListener('change', () => {
  overviewDate.innerHTML = new Date(inputDate.value).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
})


