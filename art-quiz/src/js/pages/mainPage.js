import Render from '../render';

export default class MainPage {
  static setEventListeners() {
    document.querySelector('.artist-quiz-wrapper').addEventListener('click', () => {
      document.dispatchEvent(new Event('render-artist-categories'));
    });
    document.querySelector('.pictures-quiz-wrapper').addEventListener('click', () => {
      document.dispatchEvent(new Event('render-pictures-categories'));
    });
    document.querySelector('.settings-button').addEventListener('click', () => {
      document.dispatchEvent(new Event('render-settings'));
    });
  }

  static async render() {
    const html = `
      <div class="outer-container">
        <div class="container">
        <div class="logo-wrapper">
          <img src="img/logo.png" alt="">
        </div>
        <div class="main-menu-wrapper">
          <div class="artist-quiz-wrapper">
            <div class="artist-quiz-img-wrapper"></div>
            <h2 class="artist-quiz-main-title quiz-title"><span class="text-bold">Artists</span> quiz</h2>
          </div>
          <div class="pictures-quiz-wrapper">
            <div class="pictures-quiz-img-wrapper"></div>
            <h2 class="pictures-quiz-main-title quiz-title"><span class="text-bold">Pictures</span> quiz</h2>
          </div>
        </div>
        <div class="main-btn-wrapper">
          <button class="btn settings-button">Settings</button>
        </div>
      </div>
    `;

    await Render.render(html).then(() => {
      this.setEventListeners();
    });
  }
}
