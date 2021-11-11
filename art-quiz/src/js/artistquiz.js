import { Render } from './render';
import { Data } from './data';
import { jsonData } from './index';

export class ArtistQuiz {
  constructor(quizNumber) {
    this.quizNumber = quizNumber;
    this.artistNumber = quizNumber;
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
          <h1>qwerty</h1>
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
          this.openPopup();
        }, 200);
      });
  }

  async render() {
    const json = await jsonData();
    const imageUrl = await Data.getImage(this.artistNumber)
    const set = new Set()
    set.add(json[this.artistNumber].author);
    while (set.size < 4) {
      set.add(json[this.getRandomInt()].author);
    }

    const arr = Array.from(set);
    const shuffledArr = this.shuffle(arr);

    const html = `
      <div class="container">
        <div class="artists-quiz-title">Кто автор этой картины?</div>
        <div class="artists-quiz-picture" style="background-image: ${imageUrl};"></div>
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
          <div class="popup-picture" style="background-image: ${imageUrl};"></div>
          <div class="popup-info-wrapper">
            <h2 class="popup-name">${json[this.artistNumber].name}</h2>
            <p class="popup-author">${json[this.artistNumber].author}</p>
            <p class="popup-year">${json[this.artistNumber].year}</p>
            <button class="button-next">Next</button>
          </div>
        </div>
      </div>
      <div id="overlay"></div>
    `

    await Render.render(html)
    .then(() => {
      document.querySelector('.artists-quiz-answers-list').addEventListener('click', (e) => {
        if (e.target.textContent == json[this.artistNumber].author) {
          this.isCorrect = true;
        } else {
          this.isCorrect = false;
        }
        this.openPopup();

      });
      document.querySelector('.button-next').addEventListener('click', () => {
        this.answersArr[this.answersCounter] = this.isCorrect ? 1 : 0;
        const popup = document.querySelector('.popup');
        const overlay = document.querySelector('#overlay');
        popup.classList.remove('active');
        overlay.classList.remove('active');
        if (this.answersCounter < 9) {
          this.answersCounter++;
          this.artistNumber++;
          this.render();
        } else {
          this.answersCounter++;
          this.generateResults();
        }
      });
    });
  }
}
