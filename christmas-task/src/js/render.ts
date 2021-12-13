export default class Render {
  static render(html) {
    return new Promise(resolve => {
      const app = document.getElementById('app');
      setTimeout(() => {
        app.innerHTML = html;
        resolve();
      }, 200);
    });
  }
}
