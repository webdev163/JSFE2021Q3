import Render from '../render';
import Data from '../data';
import ArtistQuiz from './artistquiz';
import MainPage from './mainPage';
import CategoryResults from './categoryResults';

export default class ArtistCategories {
  constructor() {
    this.localStorageArr = null;
  }

  static setEventListeners() {
    document.querySelector('.categories-wrapper').addEventListener('click', e => {
      if (e.target.closest('.categories-item') && !e.target.classList.contains('category-score')) {
        const clickedCategory = e.target.closest('.categories-item');
        const categoryNumber = clickedCategory.id.slice(9); // slice 'category-'
        const artistquiz = new ArtistQuiz(categoryNumber);
        artistquiz.render();
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
      const imagesArr = await Promise.all(
        new Array(12).fill(null).map((el, idx) => {
          return Data.getLocalImage(idx);
        }),
      );
      for (let i = 0; i < 12; i += 1) {
        const isDone = doneIndexArr.includes(i);
        result += `
        <div class="categories-item ${isDone ? 'category-done' : ''}" id="category-${i}">
          <div class="category-info-wrapper">
            <div class="category-done-number">${
              isDone ? `${this.localStorageArr[i].filter(el => el === 1).length}/10` : ''
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
            <button class="categories-home-button"></button>
            ${await this.generateCategories()}
          </div>
        </div>
      </div>
    `;

    await Render.render(html).then(() => this.setEventListeners());
  }

  static checkLocalStorage() {
    return new Promise(resolve => {
      if (localStorage.getItem('webdev163-quiz-results') !== null) {
        this.localStorageArr = JSON.parse(localStorage.getItem('webdev163-quiz-results'));
        const doneIndexArr = [];
        for (let i = 0; i < 12; i += 1) {
          if (this.localStorageArr[i] !== null) {
            doneIndexArr.push(i);
          }
        }
        resolve(doneIndexArr);
      } else {
        resolve();
      }
    });
  }
}
