import Render from '../../render';
import mainPageHtml from './main.html';

export default class MainPage {
  private static setEventListeners(): void {
    (document.querySelector('.main-btn') as HTMLElement).addEventListener('click', () => {
      document.dispatchEvent(new Event('render-filters'));
    });
  }

  public static async render(): Promise<void> {
    const html: string = mainPageHtml;
    await Render.render(html).then(() => {
      this.setEventListeners();
    });
  }
}
