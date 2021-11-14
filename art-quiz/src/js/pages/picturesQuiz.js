import { Render } from '../render';
import { Data } from '../data';
import { jsonData } from '../index';
import { Quiz } from '../quiz';
import { MainPage } from './mainPage';
import { PicturesCategories } from './picturesCategories';

export class PicturesQuiz extends Quiz {
  async render() {
    const json = await jsonData();
    const imageUrl = await Data.getImage(this.artistNumber)
    const set = new Set()
    set.add(imageUrl);
    while (set.size < 4) {
      const randomImageUrl = await Data.getImage(this.getRandomInt())
      set.add(randomImageUrl);
    }

    const arr = Array.from(set);
    const shuffledArr = this.shuffle(arr);

    const html = `
      <div class="container">
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
    `

    await Render.render(html).then(() => this.setEventListeners(imageUrl));
  }

  setEventListeners(imageUrl) {
    document.querySelector('.pictures-quiz-answers-list').addEventListener('click', (e) => {
      if (e.target.style.backgroundImage === imageUrl) {
        this.isCorrect = true;
      } else {
        this.isCorrect = false;
      }
      this.openPopup();
    });
    document.querySelector('.button-popup-next').addEventListener('click', async () => {
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
        await this.generateResults();
        document.querySelector('.button-popup-home').addEventListener('click', () => {
          this.removePopup();
          MainPage.render();
        });
        document.querySelector('.button-popup-next-quiz').addEventListener('click', () => {
          this.removePopup();
          PicturesCategories.render();
        });
      }
    });
  }
}
