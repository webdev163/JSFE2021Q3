export default class Render {
  public static render(html: string): Promise<void> {
    return new Promise(resolve => {
      const app = document.getElementById('app') as HTMLElement;
      setTimeout(() => {
        app.innerHTML = html;
        resolve();
      }, 200);
    });
  }
}
