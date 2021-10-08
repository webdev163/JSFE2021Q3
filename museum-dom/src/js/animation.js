window.addEventListener('load', () => {
  let elements;
  let windowHeight;

  function init() {
    elements = document.querySelectorAll('.hidden');
    windowHeight = window.innerHeight;
  }

  function checkPosition() {
    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];
      let positionFromTop = elements[i].getBoundingClientRect().top;

      if (positionFromTop - windowHeight > 100) {
        element.classList.add('hidden');
        element.classList.remove('animated');
      }

      if (positionFromTop - windowHeight <= -200) {
        element.classList.add('animated');
        element.classList.remove('hidden');
      }
    }
  }

  window.addEventListener('scroll', checkPosition);
  window.addEventListener('resize', init);

  init();
  checkPosition();
})
