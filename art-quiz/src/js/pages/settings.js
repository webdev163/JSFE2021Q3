import Render from '../render';

export const state = {
  isCheckedVolume: 0,
  isCheckedTime: 0,
  valueVolume: 100,
  valueTime: 30,
};

export default class Settings {
  static updateVolumeBar() {
    const volumeBar = document.querySelector('.progress-volume');
    const volumeTextDiv = document.querySelector('.volume-controls-current-value');
    const { value } = volumeBar;
    const valueInPercents = value * 100;
    volumeBar.style.background = `linear-gradient(to right, #660033 0%, #660033 ${valueInPercents}%, #E5E5E5 ${valueInPercents}%, #E5E5E5 100%)`;
    volumeTextDiv.textContent = Math.floor(valueInPercents);
    state.valueVolume = Math.floor(valueInPercents);
  }

  static updateTimeBar() {
    const timeBar = document.querySelector('.progress-time');
    const timeTextDiv = document.querySelector('.time-controls-current-value');
    const { value } = timeBar;
    const step = 5;
    const valuePerStep = 20;
    const stepsNum = value / step - 1;
    timeBar.style.background = `linear-gradient(to right, #660033 0%, #660033 ${stepsNum * valuePerStep}%, #E5E5E5 ${
      stepsNum * valuePerStep
    }%, #E5E5E5 100%)`;
    timeTextDiv.textContent = timeBar.value;
    state.valueTime = parseInt(timeBar.value, 10);
  }

  static async render() {
    await this.getLocalStorage();
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
              <div class="volume-controls-outer-wrapper">
                <div class="volume-controls-inner-wrapper">
                  <div class="volume-controls">
                    <input type="range" name="volume" value="${
                      state.valueVolume / 100
                    }" min="0" max="1" step=".01" class="progress progress-volume">
                    <span class="volume-controls-current-value">${state.valueVolume}</span>
                  </div>
                  <div class="volume-descr">(percents)</div>
                </div>
              </div>
              <div class="volume-checkbox-wrapper">
                <label class="label-checkbox" for="checkbox-volume"></label>
                <input class="slide-checkbox slide-checkbox-volume" type="checkbox" name="checkbox-volume" id="checkbox-volume" ${
                  state.isCheckedVolume === 1 ? 'checked' : ''
                }>
                <label class="custom-checkbox" for="checkbox-volume"></label>
              </div>
              <h3 class="volume-title">Volume</h3>
            </div>
            <div class="time-settings-wrapper">
              <div class="time-icon-wrapper">
                <img class="time-icon" src="img/clock.svg" alt="Time icon">
              </div>
              <div class="time-controls-outer-wrapper">
                <div class="time-controls-inner-wrapper">
                  <div class="time-controls">
                    <input type="range" name="time" value="${
                      state.valueTime
                    }" min="5" max="30" step="5" class="progress progress-time">
                    <span class="time-controls-current-value">${state.valueTime}</span>
                  </div>
                  <div class="time-descr">(seconds per answer)</div>
                </div>
              </div>
              <div class="time-checkbox-wrapper">
                <label class="label-checkbox" for="checkbox-time"></label>
                <input class="slide-checkbox slide-checkbox-time" type="checkbox" name="checkbox-time" id="checkbox-time" ${
                  state.isCheckedTime === 1 ? 'checked' : ''
                }>
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
    `;

    await Render.render(html).then(() => {
      this.setEventListeners();
      this.updateVolumeBar();
      this.updateTimeBar();
      this.updateVolumeInterface();
      this.updateTimeInterface();
    });
  }

  static setEventListeners() {
    const progressVolume = document.querySelector('.progress-volume');
    const progressTime = document.querySelector('.progress-time');

    progressVolume.addEventListener('change', this.updateVolumeBar);
    progressVolume.addEventListener('mousemove', this.updateVolumeBar);
    progressTime.addEventListener('change', this.updateTimeBar);
    progressTime.addEventListener('mousemove', this.updateTimeBar);
    document.querySelector('.slide-checkbox-volume').addEventListener('change', this.updateVolumeInterface);
    document.querySelector('.slide-checkbox-time').addEventListener('change', this.updateTimeInterface);
    document.querySelector('.save-button').addEventListener('click', () => {
      this.updateLocalStorage();
      document.dispatchEvent(new Event('render-main'));
    });
  }

  static updateVolumeInterface() {
    const isChecked = document.querySelector('.slide-checkbox-volume').checked;
    const controlsInnerDiv = document.querySelector('.volume-controls-inner-wrapper');
    if (isChecked) {
      controlsInnerDiv.classList.add('controls-enabled');
      state.isCheckedVolume = 1;
    } else {
      controlsInnerDiv.classList.remove('controls-enabled');
      state.isCheckedVolume = 0;
    }
  }

  static updateTimeInterface() {
    const isChecked = document.querySelector('.slide-checkbox-time').checked;
    const controlsInnerDiv = document.querySelector('.time-controls-inner-wrapper');
    if (isChecked) {
      controlsInnerDiv.classList.add('controls-enabled');
      state.isCheckedTime = 1;
    } else {
      controlsInnerDiv.classList.remove('controls-enabled');
      state.isCheckedTime = 0;
    }
  }

  static updateLocalStorage() {
    localStorage.setItem('webdev163-quiz-settings', JSON.stringify(state));
  }

  static getLocalStorage() {
    return new Promise(resolve => {
      if (localStorage.getItem('webdev163-quiz-settings')) {
        const newState = JSON.parse(localStorage.getItem('webdev163-quiz-settings'));
        Object.assign(state, newState);
      }
      resolve();
    });
  }
}
