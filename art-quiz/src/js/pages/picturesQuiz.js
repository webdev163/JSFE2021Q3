import Render from '../render';
import Data from '../data';
import Quiz from '../quiz';
import MainPage from './mainPage';
import PicturesCategories from './picturesCategories';

export default class PicturesQuiz extends Quiz {
  async render() {
    const json = await Data.getJson();
    document.body.classList.remove('loaded');
    const imageUrl = await Data.getImage(this.artistNumber);
    const set = new Set();
    set.add(imageUrl);
    const randomImagesArr = await Promise.all(
      new Array(10).fill(null).map(() => {
        return Data.getImage(Quiz.getRandomInt());
      }),
    );
    while (set.size < 4) {
      set.add(randomImagesArr.pop());
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
          <div class="pictures-quiz-title">Какую картину написал ${json[this.artistNumber].author}?</div>
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
              <button class="btn button-popup-next">Next</button>
            </div>
          </div>
        </div>
        <div id="overlay"></div>
      </div>
    `;

    await Render.render(html).then(() => this.setEventListeners(imageUrl));
  }

  setEventListeners(imageUrl) {
    document.querySelector('.home-menu-button').addEventListener('click', () => MainPage.render());
    document.querySelector('.categories-menu-button').addEventListener('click', () => PicturesCategories.render());
    document.querySelector('.pictures-quiz-answers-list').addEventListener('click', e => {
      if (e.target.style.backgroundImage === imageUrl) {
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
          PicturesCategories.render();
        });
      }
    });
  }
}
