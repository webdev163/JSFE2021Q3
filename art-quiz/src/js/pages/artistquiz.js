import Render from '../render';
import Data from '../data';
import Quiz from '../quiz';
import { state } from './settings';

export default class ArtistQuiz extends Quiz {
  async render() {
    const generateAnswersArr = await this.generateAnswers();
    const json = generateAnswersArr[0];
    const imageUrl = generateAnswersArr[1];
    const shuffledArr = generateAnswersArr[2];

    const html = `
      <div class="outer-container">
        <div class="container">
          <div class="artists-quiz-title">Кто автор этой картины?</div>
          <div class="menu-btn-wrapper">
            <button class="btn home-menu-button"></button>
            ${state.isCheckedTime === 1 ? Quiz.generateTimer() : ''}
            <button class="btn categories-menu-button"></button>
          </div>
          ${state.isCheckedTime === 1 ? '<div class="progress-timer"></div>' : ''}
          <div class="artists-quiz-picture" style='background-image: ${imageUrl};'></div>
          <div class="pagination-wrapper">${this.generatePagination()}</div>
          <div class="artists-quiz-answers-wrapper">
            <div class="artists-quiz-answers-list">
              <div class="artists-quiz-answers-item">${shuffledArr[0]}</div>
              <div class="artists-quiz-answers-item">${shuffledArr[1]}</div>
              <div class="artists-quiz-answers-item">${shuffledArr[2]}</div>
              <div class="artists-quiz-answers-item">${shuffledArr[3]}</div>
            </div>
          </div>
          <div class="popup">
            <div class="popup-sign"></div>
            <div class="popup-picture" style='background-image: ${imageUrl};'></div>
            <div class="popup-info-wrapper">
              <h2 class="popup-name">${json[this.artistNumber].name}</h2>
              <p class="popup-author">${json[this.artistNumber].author}</p>
              <p class="popup-year">${json[this.artistNumber].year}</p>
              <button class="btn button-popup-download" onclick="${this.downloadImageFunc()}">
                Download
              </button>
              <button class="btn button-popup-next">Next</button>
            </div>
          </div>
        </div>
        <audio class="audio-correct" src="audio/сorrect-answer.mp3"></audio>
        <audio class="audio-wrong" src="audio/wrong-answer.mp3"></audio>
        <div id="overlay"></div>
      </div>
    `;

    await Render.render(html).then(() => {
      this.setEventListeners(json);
      if (state.isCheckedTime === 1) {
        this.runTimer();
      }
    });
  }

  setEventListeners(json) {
    document.querySelector('.home-menu-button').addEventListener('click', () => {
      clearInterval(this.clockInterval);
      document.dispatchEvent(new Event('render-main'));
    });
    document.querySelector('.categories-menu-button').addEventListener('click', () => {
      clearInterval(this.clockInterval);
      document.dispatchEvent(new Event('render-artist-categories'));
    });
    document.querySelector('.artists-quiz-answers-list').addEventListener('click', e => this.checkAnswer(e, json));
    document.querySelector('.button-popup-next').addEventListener('click', () => {
      this.checkGameEnd();
    });
  }

  async generateAnswers() {
    document.body.classList.remove('loaded');
    const json = await Data.getJson();
    const imageUrl = await Data.getImage(this.artistNumber);
    const set = new Set();
    set.add(json[this.artistNumber].author);
    while (set.size < 4) {
      set.add(json[Quiz.getRandomInt()].author);
    }

    const arr = Array.from(set);
    const shuffledArr = Quiz.shuffle(arr);
    return [json, imageUrl, shuffledArr];
  }

  checkAnswer(e, json) {
    if (e.target.textContent === json[this.artistNumber].author) {
      if (state.isCheckedVolume === 1) {
        const audio = document.querySelector('.audio-correct');
        audio.volume = state.valueVolume / 100;
        audio.play();
      }
      e.target.classList.add('right-answer');
      this.isCorrect = true;
    } else {
      if (!e.target.classList.contains('artists-quiz-answers-item')) return;
      if (state.isCheckedVolume === 1) {
        const audio = document.querySelector('.audio-wrong');
        audio.volume = state.valueVolume / 100;
        audio.play();
      }
      e.target.classList.add('wrong-answer');
      this.isCorrect = false;
    }
    clearInterval(this.clockInterval);
    clearInterval(this.timerProgressInterval);
    this.openPopup();
  }
}
