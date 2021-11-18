export default class Render {
  static render(html) {
    return new Promise(resolve => {
      const app = document.getElementById('app');
      document.body.classList.remove('loaded');
      setTimeout(() => {
        app.innerHTML = html;
        resolve();
      }, 200);
    }).then(() => {
      setTimeout(() => {
        document.body.classList.add('loaded_hiding');
        window.setTimeout(() => {
          document.body.classList.add('loaded');
          document.body.classList.remove('loaded_hiding');
        }, 200);
      }, 200);
    });
  }
}
