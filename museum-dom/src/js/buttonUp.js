const buttonUp = document.querySelector('.button-up');

window.addEventListener('scroll', function () {
  const pos = window.pageYOffset;
  if (pos > window.innerHeight) {
    buttonUp.classList.add('button-up-visible');
  }
  else {
    buttonUp.classList.remove('button-up-visible');
  }
})

buttonUp.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
})