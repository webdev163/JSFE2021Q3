const footer = `
  <div class="fullscreen-icon-wrapper">
    <img width="25" height="25" class="fullscreen-icon" src="img/fullscreen.svg" alt="" onclick="!document.fullscreenElement ? body.requestFullscreen() : document.exitFullscreen()">
  </div>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-info-wrapper">
        <a class="footer-github-link" href="https://github.com/webdev163" target="_blank">
          <img src="img/github-logo.svg" width="30" height="30" alt="Github logo">
        </a>
        <a class="footer-rsschool" href="https://rs.school/js/" target="_blank">
          <img class="footer-rsschool-img" src="img/rs_school_js.svg" width="75" height="25" alt="RS School logo">
        </a>
        <div class="footer-copyright">&copy; 2021</div>
      </div>
    </div>
  </footer>
`;

export default class Render {
  static render(html) {
    return new Promise(resolve => {
      const app = document.getElementById('app');
      document.body.classList.remove('loaded');
      setTimeout(() => {
        app.innerHTML = html + footer;
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
