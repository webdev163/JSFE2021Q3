import Render from '../render';
import Category from '../category';

export default class PicturesCategories extends Category {
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
            ${await this.generateCategories('pictures')}
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
