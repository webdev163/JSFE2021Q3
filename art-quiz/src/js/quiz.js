import Render from './render';
import { state } from './pages/settings';

export default class Quiz {
  constructor(quizNumber) {
    this.quizNumber = quizNumber;
    this.artistNumber = quizNumber * 10;
    this.answersCounter = 0;
    this.answersArr = new Array(10).fill(null);
  }

  static getRandomInt() {
    return Math.floor(Math.random() * 239) + 1;
  }

  static shuffle(array) {
    const arr = array;
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  openPopup() {
    const popup = document.querySelector('.popup');
    const overlay = document.querySelector('#overlay');
    if (this.answersCounter < 10) {
      const sign = document.querySelector('.popup-sign');
      sign.style.backgroundImage = `url("img/${this.isCorrect ? 'right' : 'wrong'}.png")`;
    }
    popup.classList.add('active');
    setTimeout(() => {
      overlay.classList.add('active');
    }, 200);
  }

  generatePagination() {
    let result = '';
    for (let i = 0; i < 10; i += 1) {
      let html = '';
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
    const correctAnswersNum = this.answersArr.filter(el => el === 1).length;
    const totalAnswersNum = this.answersArr.length;
    let finalWord = correctAnswersNum < 1 ? 'You can do better, try again!' : 'Congratulations!';
    switch (correctAnswersNum) {
      case 0:
      case 1:
        finalWord = 'You can do better, try again!';
        break;
      case 2:
      case 3:
      case 4:
        finalWord = 'Not bad, try again to improve!';
        break;
      case 5:
      case 6:
      case 7:
        finalWord = 'Congratulations, nice shot!';
        break;
      case 8:
      case 9:
        finalWord = 'Very well, it looks like you are an art lover!';
        break;
      default:
        finalWord = 'You are an art professional, congratulations!';
        break;
    }
    const html = `
      <div class="container">
        <div class="popup">
          <h2 class="text-results congratulation">${finalWord}</h2>
          <p class="text-results score-results">${correctAnswersNum} / ${totalAnswersNum}</p>
          <div class="congratulation-picture-wrapper">
            <img class="congratulation-picture" src="img/goodjob.svg" alt="Good job!">
          </div>
          <div class="popup-btn-wrapper">
            <button class="btn button-popup-home">Home</button>
            <button class="btn button-popup-next-quiz">Next quiz</button>
          </div>
        </div>
        <audio class="audio-end" src="audio/round-end.mp3"></audio>
      </div>
      <div id="overlay"></div>
    `;
    if (localStorage.getItem('webdev163-quiz-results') !== null) {
      const arr = JSON.parse(localStorage.getItem('webdev163-quiz-results'));
      arr[this.quizNumber] = this.answersArr;
      localStorage.setItem('webdev163-quiz-results', JSON.stringify(arr));
    } else {
      const arr = new Array(24).fill(null);
      arr[this.quizNumber] = this.answersArr;
      localStorage.setItem('webdev163-quiz-results', JSON.stringify(arr));
    }
    await Render.render(html).then(() => {
      setTimeout(() => {
        this.openPopup();
      }, 200);
    });
  }

  static generateTimer() {
    let time = `00:${state.valueTime}`;
    if (state.valueTime < 10) {
      time = `00:0${state.valueTime}`;
    }
    return `
      <div class="timer">
        <img class="timer-img" src="img/clock.svg" alt="">
        <div class="timer-text">${time}</div>
      </div>
    `;
  }
}
