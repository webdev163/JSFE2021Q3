import Render from '../render';
import Data from '../data';
import PicturesQuiz from './picturesQuiz';
import MainPage from './mainPage';
import CategoryResults from './categoryResults';

export default class PicturesCategories {
  constructor() {
    this.localStorageArr = null;
  }

  static setEventListeners() {
    document.querySelector('.categories-wrapper').addEventListener('click', e => {
      if (e.target.closest('.categories-item') && !e.target.classList.contains('category-score')) {
        const clickedCategory = e.target.closest('.categories-item');
        const categoryNumber = clickedCategory.id.slice(9); // slice 'category-'
        const picturesquiz = new PicturesQuiz(categoryNumber);
        picturesquiz.render();
      }
      if (e.target.classList.contains('category-score')) {
        const clickedCategory = e.target.closest('.categories-item');
        const categoryNumber = clickedCategory.id.slice(9); // slice 'category-'
        CategoryResults.render(categoryNumber);
      }
    });
    document.querySelector('.categories-home-button').addEventListener('click', () => MainPage.render());
    // document.querySelector('.settings-button').addEventListener('click', () => Settings.render());
  }

  static async generateCategories() {
    let result = '';
    await this.checkLocalStorage().then(async (doneIndexArr = []) => {
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
      const offset = 12;
      const imagesArr = await Promise.all(
        new Array(12).fill(null).map((el, idx) => {
          return Data.getLocalImage(idx + offset);
        }),
      );
      for (let i = 0; i < 12; i += 1) {
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

  static async render() {
    const html = `
      <div class="outer-container">
        <div class="container">
          <div class="logo-wrapper">
            <img src="img/logo.png" alt="">
          </div>
          <h2 class="categories-title">Categories</h2>
          <div class="categories-wrapper">
            <button class="btn categories-home-button"></button>
            ${await this.generateCategories()}
          </div>
        </div>
      </div>
    `;

    await Render.render(html).then(() => {
      this.animateCards();
      this.setEventListeners();
    });
  }

  static checkLocalStorage() {
    return new Promise(resolve => {
      if (localStorage.getItem('webdev163-quiz-results') !== null) {
        this.localStorageArr = JSON.parse(localStorage.getItem('webdev163-quiz-results'));
        const doneIndexArr = [];
        for (let i = 0; i < 12; i += 1) {
          if (this.localStorageArr[i + 12] !== null) {
            doneIndexArr.push(i + 12);
          }
        }
        resolve(doneIndexArr);
      } else {
        resolve();
      }
    });
  }

  static animateCards() {
    let elements;
    let windowHeight;
    const offset = -9999;

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
}
