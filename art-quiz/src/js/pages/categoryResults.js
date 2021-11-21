import Render from '../render';
import Data from '../data';

export default class CategoryResults {
  static setEventListeners(categoryNum) {
    document.querySelector('.home-menu-button').addEventListener('click', () => {
      document.dispatchEvent(new Event('render-main'));
    });
    document.querySelector('.categories-menu-button').addEventListener('click', () => {
      if (categoryNum < 12) {
        document.dispatchEvent(new Event('render-artist-categories'));
      } else {
        document.dispatchEvent(new Event('render-pictures-categories'));
      }
    });
    document.querySelector('.results-wrapper').addEventListener('click', e => {
      if (e.target.closest('.categories-item')) {
        const clickedItem = e.target.closest('.categories-item');
        clickedItem.classList.toggle('active');
      }
    });
  }

  static async generateCategoryItems(categoryNum) {
    const json = await Data.getJson();
    let result = '';
    const resultsArr = JSON.parse(localStorage.getItem('webdev163-quiz-results'))[categoryNum];
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
    const type = categoryNum < typesArr.length ? typesArr[categoryNum] : typesArr[categoryNum - typesArr.length];
    const imagesArr = await Promise.all(
      new Array(10).fill(null).map((el, idx) => {
        return Data.getImage(categoryNum * 10 + idx);
      }),
    );
    for (let i = 0; i < 10; i += 1) {
      const imageId = categoryNum * 10 + i;
      const isDone = resultsArr[i] === 1;
      result += `
      <div class="categories-item ${isDone ? 'item-done' : ''}" id="item-${imageId}"">
        <div class="item-mark";'></div>
        <div class="category-info-wrapper">
          <div class="category-type">${type}</div>
        </div>
        <div class="category-image" style='background-image: ${imagesArr[i]};'></div>
        <div class="item-info-wrapper">
          <div class="item-name">${json[imageId].name}</div>
          <div class="item-author">${json[imageId].author}</div>
          <div class="item-year">${json[imageId].year}</div>
        </div>
      </div>
    `;
    }
    return result;
  }

  static async render(categoryNum) {
    document.body.classList.remove('loaded');
    const html = `
      <div class="outer-container">
        <div class="container">
          <div class="logo-wrapper">
            <img src="img/logo.png" alt="">
          </div>
          <div class="menu-btn-wrapper">
            <button class="btn home-menu-button"></button>
            <button class="btn categories-menu-button"></button>
          </div>
          <h2 class="results-title">Score</h2>
          <div class="results-wrapper">
            ${await this.generateCategoryItems(categoryNum)}
          </div>
        </div>
      </div>
    `;

    await Render.render(html).then(() => this.setEventListeners(categoryNum));
  }
}
