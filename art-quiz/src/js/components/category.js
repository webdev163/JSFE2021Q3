import Data from '../data';

export default class Category {
  constructor() {
    this.localStorageArr = null;
  }

  static animateCards() {
    let elements;
    let windowHeight;
    const offset = -100;
    const fullscreenOffset = -500;

    const init = () => {
      elements = document.querySelectorAll('.hidden');
      windowHeight = window.innerHeight;
    };

    const checkPosition = () => {
      for (let i = 0; i < elements.length; i += 1) {
        const element = elements[i];
        const positionFromTop = !document.fullscreenElement
          ? elements[i].getBoundingClientRect().top
          : elements[i].getBoundingClientRect().top + fullscreenOffset;

        if (positionFromTop - windowHeight <= offset) {
          element.classList.add('animated');
          element.classList.remove('hidden');
        }
      }
    };

    window.addEventListener('scroll', checkPosition);
    window.addEventListener('resize', init);

    init();
    checkPosition();
  }

  static checkLocalStorage(type) {
    const offset = type === 'artist' ? 0 : 11;
    return new Promise(resolve => {
      if (localStorage.getItem('webdev163-quiz-results') !== null) {
        this.localStorageArr = JSON.parse(localStorage.getItem('webdev163-quiz-results'));
        const doneIndexArr = [];
        const categoriesInGame = 12;
        for (let i = 0; i < categoriesInGame; i += 1) {
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

  static async generateCategories(type) {
    let result = '';
    await this.checkLocalStorage(type).then(async (doneIndexArr = []) => {
      const typesArr = [
        'Portrait',
        'Landscape',
        'Still life',
        'Impressionism',
        'Expressionism',
        'Avant-garde',
        'Renaissance',
        'Surrealism',
        'Kitsch',
        'Minimalism',
        'Surrealism',
        'Industrial',
      ];
      const offset = type === 'artist' ? 0 : 12;
      const categoriesInGame = 12;
      const imagesArr = await Promise.all(
        new Array(categoriesInGame).fill(null).map((el, idx) => {
          return Data.getLocalImage(idx + offset);
        }),
      );
      for (let i = 0; i < categoriesInGame; i += 1) {
        const isDone = doneIndexArr.includes(i + offset);
        result += `
        <div class="categories-item hidden fade-in-${i} ${isDone ? 'category-done' : ''}" id="category-${i + offset}">
          <div class="category-info-wrapper">
            <div class="category-done-number">${
              isDone ? `${this.localStorageArr[i + offset].filter(el => el === 1).length}/10` : ''
            }</div>
            <div class="category-number">${i + 1}</div>
            <div class="category-type">${typesArr[i]}</div>
          </div>
          <div class="category-image" style='background-image: ${imagesArr[i]};'></div>
          <div class="category-score">Score</div>
        </div>
      `;
      }
    });
    return result;
  }

  static handleClick(e) {
    if (e.target.closest('.categories-item') && !e.target.classList.contains('category-score')) {
      const clickedCategory = e.target.closest('.categories-item');
      const categoryNumber = clickedCategory.id.slice(9); // slice 'category-'
      const event = new CustomEvent('render-quiz', {
        detail: categoryNumber,
      });
      document.dispatchEvent(event);
    }
    if (e.target.classList.contains('category-score')) {
      const clickedCategory = e.target.closest('.categories-item');
      const categoryNumber = clickedCategory.id.slice(9); // slice 'category-'
      const event = new CustomEvent('render-category-results', {
        detail: categoryNumber,
      });
      document.dispatchEvent(event);
    }
  }

  static setEventListeners() {
    document.querySelector('.categories-wrapper').addEventListener('click', e => {
      this.handleClick(e);
    });
    document.querySelector('.categories-home-button').addEventListener('click', () => {
      document.dispatchEvent(new Event('render-main'));
    });
  }
}
