import Render from '../render';
import Data from '../data';
import Quiz from '../quiz';
import MainPage from './mainPage';
import PicturesCategories from './picturesCategories';
import { state } from './settings';

export default class PicturesQuiz extends Quiz {
  async render() {
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
              <button class="btn button-popup-download" onclick="fetch('https://raw.githubusercontent.com/webdev163/image-data/master/full/${
                this.artistNumber
              }full.jpg')
                .then(resp => resp.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = name;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                })">
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
      clearInterval(this.interval);
      MainPage.render();
    });
    document.querySelector('.categories-menu-button').addEventListener('click', () => {
      clearInterval(this.interval);
      PicturesCategories.render();
    });
    document.querySelector('.pictures-quiz-answers-list').addEventListener('click', e => this.checkAnswer(e, imageUrl));
    document.querySelector('.button-popup-next').addEventListener('click', async () => {
      this.answersArr[this.answersCounter] = this.isCorrect ? 1 : 0;
      if (this.answersCounter < 9) {
        this.answersCounter += 1;
        this.artistNumber += 1;
        this.render();
      } else {
        this.answersCounter += 1;
        await this.generateResults();
        if (state.isCheckedVolume === 1) {
          const audio = document.querySelector('.audio-end');
          audio.volume = state.valueVolume / 100;
          audio.play();
        }
        document.querySelector('.button-popup-home').addEventListener('click', () => {
          MainPage.render();
        });
        document.querySelector('.button-popup-next-quiz').addEventListener('click', () => {
          PicturesCategories.render();
        });
      }
    });
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
    clearInterval(this.interval);
    clearInterval(this.timerProgressInterval);
    this.openPopup();
  }

  runTimer() {
    let time = state.valueTime;
    const initialTime = time;
    const timer = document.querySelector('.timer-text');
    const progress = document.querySelector('.progress-timer');
    const startTime = new Date().getTime();
    const endTime = startTime + time * 1000;
    this.timerProgressInterval = setInterval(() => {
      let currentProgressWidth = (endTime - new Date().getTime()) / 1000;
      currentProgressWidth = (currentProgressWidth / initialTime) * 100;
      progress.style.width = `${currentProgressWidth}%`;
      if (currentProgressWidth < 50 && currentProgressWidth >= 25) {
        progress.style.backgroundColor = 'yellow';
      } else if (currentProgressWidth < 25) {
        progress.style.backgroundColor = 'red';
      }
      if (currentProgressWidth < 0) {
        clearInterval(this.timerProgressInterval);
      }
    }, 100);
    this.interval = setInterval(() => {
      time -= 1;
      if (time < 10) {
        timer.textContent = `00:0${time}`;
      } else {
        timer.textContent = `00:${time}`;
      }
      if (time === 0) {
        clearInterval(this.interval);
        progress.style.width = '0%';
        this.isCorrect = false;
        if (state.isCheckedVolume === 1) {
          const audio = document.querySelector('.audio-wrong');
          audio.volume = state.valueVolume / 100;
          audio.play();
        }
        this.openPopup();
      }
    }, 1000);
  }
}
