import Render from '../render';
import Data from '../data';
import Category from '../category';

export default class ArtistCategories extends Category {
  static setEventListeners() {
    document.querySelector('.categories-wrapper').addEventListener('click', e => {
      if (e.target.closest('.categories-item') && !e.target.classList.contains('category-score')) {
        const clickedCategory = e.target.closest('.categories-item');
        const categoryNumber = clickedCategory.id.slice(9); // slice 'category-'
        const event = new CustomEvent('render-artist-quiz', {
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
    });
    document.querySelector('.categories-home-button').addEventListener('click', () => {
      document.dispatchEvent(new Event('render-main'));
    });
  }

  static async generateCategories() {
    let result = '';
    await this.checkLocalStorage(1).then(async (doneIndexArr = []) => {
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
        <div class="categories-item hidden fade-in-${i} ${isDone ? 'category-done' : ''}" id="category-${i}">
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
}
