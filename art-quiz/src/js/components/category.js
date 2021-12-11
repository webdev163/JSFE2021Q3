import Data from '../data';
import Constants from '../constants';

export default class Category {
  constructor() {
    this.quizResultsArr = null;
  }

  static animateCards() {
    let elements;
    let windowHeight;

    const init = () => {
      elements = document.querySelectorAll('.hidden');
      windowHeight = window.innerHeight;
    };

    const checkPosition = () => {
      for (let i = 0; i < elements.length; i += 1) {
        const element = elements[i];
        const positionFromTop = !document.fullscreenElement
          ? elements[i].getBoundingClientRect().top
          : elements[i].getBoundingClientRect().top + Constants.CARDS_ANIMATION_FULLSCREEN_OFFSET;

        if (positionFromTop - windowHeight <= Constants.CARDS_ANIMATION_OFFSET) {
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
    const offset = type === Constants.QUIZ_TYPES.artist ? 0 : 11;
    return new Promise(resolve => {
      if (localStorage.getItem('webdev163-quiz-results') !== null) {
        this.quizResultsArr = JSON.parse(localStorage.getItem('webdev163-quiz-results'));
        const doneIndexArr = [];
        for (let i = 0; i < Constants.CATEGORIES_IN_GAME_COUNT; i += 1) {
          const currentCategoryNum = i + offset;
          if (this.quizResultsArr[currentCategoryNum] !== null) {
            doneIndexArr.push(currentCategoryNum);
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
      const offset = type === Constants.QUIZ_TYPES.artist ? 0 : 12;
      const imagesArr = await Promise.all(
        new Array(Constants.CATEGORIES_IN_GAME_COUNT).fill(null).map((el, idx) => {
          return Data.getLocalImage(idx + offset);
        }),
      );
      for (let i = 0; i < Constants.CATEGORIES_IN_GAME_COUNT; i += 1) {
        const currentCategoryNum = i + offset;
        const isDone = doneIndexArr.includes(currentCategoryNum);
        result += `
        <div class="categories-item hidden fade-in-${i} ${isDone ? 'category-done' : ''}" id="category-${i + offset}">
          <div class="category-info-wrapper">
            <div class="category-done-number">${
              isDone ? `${this.quizResultsArr[currentCategoryNum].filter(el => el === 1).length}/10` : ''
            }</div>
            <div class="category-number">${i + 1}</div>
            <div class="category-type">${Constants.ART_TYPES[i]}</div>
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
