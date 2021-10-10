const inputTime = document.querySelector('.input-time');
const customSelect = document.querySelector('.custom-select');
const overviewTime = document.querySelector('.overview-time');

inputTime.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  customSelect.classList.add('custom-select-active');
})
inputTime.addEventListener('keydown', (e) => {
  e.preventDefault();
})
customSelect.addEventListener('click', (e) => {
  inputTime.value = e.target.dataset.value;
  customSelect.classList.remove('custom-select-active');
  overviewTime.innerHTML = inputTime.value;
})
