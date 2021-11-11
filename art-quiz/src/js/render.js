export class Render {
  static render(html) {
    return new Promise((resolve) => {
      const app = document.getElementById('app');
      app.style.left = '-100%'
      setTimeout(() => {
        app.innerHTML = html;
        app.style.left = '0'
        resolve();
      }, 700);
    })
  }
}
