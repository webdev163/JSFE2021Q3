import { Render } from '../render';

export class MainPage {
  setEventListeners() {
    document.querySelector('.artist-quiz-wrapper').addEventListener('click', () => {
      console.log('222');
    });
    document.querySelector('.pictures-quiz-wrapper').addEventListener('click', () => {
      console.log('333');
    });
    document.querySelector('.settings-button').addEventListener('click', () => {
      console.log('111');
    });
  }

  async render() {
    const html = `
      <div class="main-menu-outer-container">
        <div class="container">
        <div class="logo-wrapper">
          <img src="img/logo.png" alt="">
        </div>
        <div class="main-menu-wrapper">
          <div class="artist-quiz-wrapper">
            <div class="artist-quiz-img-wrapper">
            </div>
            <h2 class="artist-quiz-title quiz-title"><span class="text-bold">Artists</span> quiz</h2>
          </div>
          <div class="pictures-quiz-wrapper">
            <div class="pictures-quiz-img-wrapper">
            </div>
            <h2 class="pictures-quiz-title quiz-title"><span class="text-bold">Pictures</span> quiz</h2>
          </div>
        </div>
        <div class="main-btn-wrapper">
          <button class="btn settings-button">Settings</button>
        </div>
      </div>
      </div>
    `

    await Render.render(html).then(() => this.setEventListeners());
  }
}
