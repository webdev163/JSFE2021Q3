import Render from '../render';
import Data from '../data';
import Quiz from '../quiz';
import MainPage from './mainPage';
import ArtistCategories from './artistCategories';

export default class ArtistQuiz extends Quiz {
  async render() {
    const json = await Data.getJson();
    document.body.classList.remove('loaded');
    const imageUrl = await Data.getImage(this.artistNumber);
    const set = new Set();
    set.add(json[this.artistNumber].author);
    while (set.size < 4) {
      set.add(json[Quiz.getRandomInt()].author);
    }

    const arr = Array.from(set);
    const shuffledArr = Quiz.shuffle(arr);

    const html = `
      <div class="outer-container">
        <div class="container">
          <div class="menu-btn-wrapper">
            <button class="btn home-menu-button"></button>
            <button class="btn categories-menu-button"></button>
          </div>
          <div class="artists-quiz-title">Кто автор этой картины?</div>
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
              <button class="btn button-popup-next">Next</button>
            </div>
          </div>
        </div>
        <div id="overlay"></div>
      </div>
    `;

    await Render.render(html).then(() => this.setEventListeners(json));
  }

  setEventListeners(json) {
    document.querySelector('.home-menu-button').addEventListener('click', () => MainPage.render());
    document.querySelector('.categories-menu-button').addEventListener('click', () => ArtistCategories.render());
    document.querySelector('.artists-quiz-answers-list').addEventListener('click', e => {
      if (e.target.textContent === json[this.artistNumber].author) {
        this.isCorrect = true;
      } else {
        this.isCorrect = false;
      }
      this.openPopup();
    });
    document.querySelector('.button-popup-next').addEventListener('click', async () => {
      this.answersArr[this.answersCounter] = this.isCorrect ? 1 : 0;
      if (this.answersCounter < 9) {
        this.answersCounter += 1;
        this.artistNumber += 1;
        this.render();
      } else {
        this.answersCounter += 1;
        await this.generateResults();
        document.querySelector('.button-popup-home').addEventListener('click', () => {
          MainPage.render();
        });
        document.querySelector('.button-popup-next-quiz').addEventListener('click', () => {
          ArtistCategories.render();
        });
      }
    });
  }
}
