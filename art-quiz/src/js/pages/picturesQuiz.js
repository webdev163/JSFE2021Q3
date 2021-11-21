import Render from '../render';
import Data from '../data';
import Quiz from '../quiz';
import { state } from './settings';

export default class PicturesQuiz extends Quiz {
  async render() {
    const generateAnswersArr = await this.generateAnswers();
    const json = generateAnswersArr[0];
    const imageUrl = generateAnswersArr[1];
    const shuffledArr = generateAnswersArr[2];

    const html = `
      <div class="outer-container">
        <div class="container">
          <div class="pictures-quiz-title">Какую картину написал ${json[this.artistNumber].author}?</div>
          <div class="menu-btn-wrapper">
            <button class="btn home-menu-button"></button>
            ${state.isCheckedTime === 1 ? Quiz.generateTimer() : ''}
            <button class="btn categories-menu-button"></button>
          </div>
          ${state.isCheckedTime === 1 ? '<div class="progress-timer"></div>' : ''}
          <div class="pictures-quiz-picture" style="background-image: ${imageUrl};"></div>
          <div class="pictures-quiz-answers-wrapper">
            <div class="pictures-quiz-answers-list">
              <div class="pictures-quiz-answers-item" style='background-image: ${shuffledArr[0]};'></div>
              <div class="pictures-quiz-answers-item" style='background-image: ${shuffledArr[1]};'></div>
              <div class="pictures-quiz-answers-item" style='background-image: ${shuffledArr[2]};'></div>
              <div class="pictures-quiz-answers-item" style='background-image: ${shuffledArr[3]};'></div>
            </div>
          </div>
          <div class="pagination-wrapper">${this.generatePagination()}</div>
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
      this.setEventListeners(imageUrl);
      if (state.isCheckedTime === 1) {
        this.runTimer();
      }
    });
  }

  setEventListeners(imageUrl) {
    document.querySelector('.home-menu-button').addEventListener('click', () => {
      clearInterval(this.clockInterval);
      document.dispatchEvent(new Event('render-main'));
    });
    document.querySelector('.categories-menu-button').addEventListener('click', () => {
      clearInterval(this.clockInterval);
      document.dispatchEvent(new Event('render-pictures-categories'));
    });
    document.querySelector('.pictures-quiz-answers-list').addEventListener('click', e => {
      this.checkAnswer(e, imageUrl);
    });
    document.querySelector('.button-popup-next').addEventListener('click', () => {
      this.checkGameEnd();
    });
  }

  async generateAnswers() {
    const json = await Data.getJson();
    document.body.classList.remove('loaded');
    const imageUrl = await Data.getImage(this.artistNumber);
    const imageNumbersArr = [this.artistNumber];
    const set = new Set();

    set.add(json[this.artistNumber].author);
    while (set.size < 4) {
      const randomNum = Quiz.getRandomInt();
      if (json[this.artistNumber].author !== json[randomNum].author) {
        imageNumbersArr.push(randomNum);
        set.add(json[randomNum].author);
      }
    }

    const urlsArr = await Promise.all(imageNumbersArr.map(el => Data.getImage(el)));
    const shuffledArr = Quiz.shuffle(urlsArr);
    return [json, imageUrl, shuffledArr];
  }

  checkAnswer(e, imageUrl) {
    if (e.target.style.backgroundImage === imageUrl) {
      if (state.isCheckedVolume === 1) {
        const audio = document.querySelector('.audio-correct');
        audio.volume = state.valueVolume / 100;
        audio.play();
      }
      this.isCorrect = true;
    } else {
      if (!e.target.classList.contains('pictures-quiz-answers-item')) return;
      if (state.isCheckedVolume === 1) {
        const audio = document.querySelector('.audio-wrong');
        audio.volume = state.valueVolume / 100;
        audio.play();
      }
      this.isCorrect = false;
    }
    clearInterval(this.clockInterval);
    clearInterval(this.timerProgressInterval);
    this.openPopup();
  }
}
