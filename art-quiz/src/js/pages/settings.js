import { Render } from '../render';
import { MainPage } from './mainPage';

export class Settings {
  static setEventListeners() {
    const volumeBar = document.querySelector('.progress-small');
    volumeBar.addEventListener('change', this.handleVolumeBarUpdate);
    volumeBar.addEventListener('mousemove', this.handleVolumeBarUpdate);
    document.querySelector('.save-button').addEventListener('click', () => MainPage.render());
  }

  static handleVolumeBarUpdate() {
    const volumeBar = document.querySelector('.progress-small');
    const value = volumeBar.value;
    volumeBar.style.background = `linear-gradient(to right, #660033 0%, #660033 ${value * 100}%, #E5E5E5 ${value * 100}%, #E5E5E5 100%)`;
}

  static async render() {
    const html = `
      <div class="outer-container">
        <div class="container">
          <div class="logo-wrapper">
            <img src="img/logo.png" alt="">
          </div>
          <h2 class="settings-title">Settings</h2>
          <div class="settings-wrapper">
            <div class="volume-settings-wrapper">
              <div class="volume-icon-wrapper">
                <img class="volume-icon" src="img/volume.svg" alt="Volume icon">
              </div>
              <div class="volume-controls">
                <button class="volume-button player-icon"></button>
                <input type="range" name="volume" value="1" min="0" max="1" step=".05" class="progress progress-small">
              </div>
              <h3 class="volume-title">Volume</h3>
            </div>
            <div class="time-settings-wrapper">
              <div class="time-icon-wrapper">
                <img class="time-icon" src="img/clock.svg" alt="Time icon">
              </div>
              <div class="time-checkbox-wrapper">
                <label class="label-checkbox" for="checkbox-time"></label>
                <input class="slide-checkbox" type="checkbox" name="time" id="checkbox-time">
                <label class="custom-checkbox" for="checkbox-time"></label>
              </div>
              <h3 class="volume-title">Time game</h3>
            </div>
          </div>
          <div class="settings-btn-wrapper">
            <button class="btn save-button">Save</button>
          </div>
        </div>
      </div>
    `

    await Render.render(html).then(() => this.setEventListeners());
  }
}
