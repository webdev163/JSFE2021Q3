export default class Category {
  constructor() {
    this.localStorageArr = null;
  }

  static animateCards() {
    let elements;
    let windowHeight;
    const offset = -500;

    function init() {
      elements = document.querySelectorAll('.hidden');
      windowHeight = window.innerHeight;
    }

    function checkPosition() {
      for (let i = 0; i < elements.length; i += 1) {
        const element = elements[i];
        const positionFromTop = !document.fullscreenElement
          ? elements[i].getBoundingClientRect().top
          : elements[i].getBoundingClientRect().top + offset;

        if (positionFromTop - windowHeight <= -100) {
          element.classList.add('animated');
          element.classList.remove('hidden');
        }
      }
    }

    window.addEventListener('scroll', checkPosition);
    window.addEventListener('resize', init);

    init();
    checkPosition();
  }

  static checkLocalStorage(type) {
    const offset = type === 1 ? 0 : 11;
    return new Promise(resolve => {
      if (localStorage.getItem('webdev163-quiz-results') !== null) {
        this.localStorageArr = JSON.parse(localStorage.getItem('webdev163-quiz-results'));
        const doneIndexArr = [];
        for (let i = 0; i < 12; i += 1) {
          if (this.localStorageArr[i + offset] !== null) {
            doneIndexArr.push(i + offset);
          }
        }
        resolve(doneIndexArr);
      } else {
        resolve();
      }
    });
  }
}
