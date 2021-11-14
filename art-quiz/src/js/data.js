export class Data {
  constructor() {
    // this.container = document.querySelector('.artists-quiz-picture');
  }

  static async getJson() {
    const url = `https://raw.githubusercontent.com/webdev163/image-data/master/data.json`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  static async getImage(num) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = `https://raw.githubusercontent.com/webdev163/image-data/master/img/${num}.jpg`;
      img.addEventListener('load', () => {
        resolve(`url("${img.src}")`);
      })
    })
  }
}