import { Render } from './render';
import { Data } from './data';
import { jsonData } from './index';

export class Quiz {
  constructor(quizNumber) {
    this.quizNumber = quizNumber;
    this.artistNumber = quizNumber * 10;
    this.answersCounter = 0;
    this.answersArr = new Array(10).fill(null);
  }

  getRandomInt() {
    return Math.floor(Math.random() * 239) + 1;
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  openPopup() {
    const popup = document.querySelector('.popup');
    const overlay = document.querySelector('#overlay');
    if (this.answersCounter < 10) {
      const sign = document.querySelector('.popup-sign');
      sign.style.backgroundImage = `url("img/${this.isCorrect ? 'right' : 'wrong'}.png")`;
    }
    popup.classList.add('active');
    overlay.classList.add('active');
  }

  generatePagination() {
    let result = '';
    for (let i = 0; i < 10; i++) {
      const html = '';
      if (this.answersArr[i] === 1) {
        html = `<div class="pagination-item pagination-correct" id="dot-${i}"></div>`;
      } else if (this.answersArr[i] === 0) {
        html = `<div class="pagination-item pagination-wrong" id="dot-${i}"></div>`;
      } else {
        html = `<div class="pagination-item" id="dot-${i}"></div>`;
      }
      result += html;
    }
    return result;
  }

  async generateResults() {
    const html = `
      <div class="container">
        <div class="popup">
          <h2 class="text-results congratulation">Congratulations!</h2>
          <p class="text-results score-results">${this.answersArr.filter(el => el === 1).length} / ${this.answersArr.length}</p>
          <div class="congratulation-picture-wrapper">
            <img class="congratulation-picture" src="img/goodjob.svg" alt="Good job!">
          </div>
          <div class="popup-btn-wrapper">
            <button class="btn button-popup-home">Home</button>
            <button class="btn button-popup-next-quiz">Next quiz</button>
          </div>
        </div>
      </div>
      <div id="overlay"></div>
    `
    if (localStorage.getItem('webdev163-quiz-results') !== null) {
      const arr = JSON.parse(localStorage.getItem('webdev163-quiz-results'));
      arr[this.quizNumber] = this.answersArr;
      localStorage.setItem('webdev163-quiz-results', JSON.stringify(arr));
    } else {
      const arr = new Array(24).fill(null);
      arr[this.quizNumber] = this.answersArr;
      localStorage.setItem('webdev163-quiz-results', JSON.stringify(arr));
    }
    await Render.render(html)
      .then(() => {
        setTimeout(() => {
          // this.setEventListeners();
          this.openPopup();
        }, 200);
      });
  }

  removePopup() {
    document.querySelector('.popup').classList.remove('active');
    document.querySelector('#overlay').classList.remove('active');
  }
}
