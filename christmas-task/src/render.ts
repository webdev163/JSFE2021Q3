export default class Render {
  public static render(html: string): Promise<void> {
    return new Promise(resolve => {
      const app = document.getElementById('app') as HTMLElement;
      document.body.classList.remove('loaded');
      setTimeout(() => {
        app.innerHTML = html;
        resolve(null);
      }, 750);
    }).then(() => {
      setTimeout((): void => {
        document.body.classList.add('loaded_hiding');
        window.setTimeout(() => {
          document.body.classList.add('loaded');
          document.body.classList.remove('loaded_hiding');
        }, 200);
      }, 200);
    });
  }
}
