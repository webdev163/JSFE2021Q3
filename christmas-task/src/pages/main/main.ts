import Render from '../../render';
import mainPageHtml from './main.html';
import { preventDefault } from '../../utils';

export default class MainPage {
  private static setEventListeners(): void {
    const mainLink = document.querySelector('.main-link') as HTMLElement;
    const toysLink = document.querySelector('.toys-link') as HTMLElement;
    const treeLink = document.querySelector('.tree-link') as HTMLElement;
    const mainBtn = document.querySelector('.main-btn') as HTMLElement;

    mainLink.addEventListener('click', (e: Event) => {
      preventDefault(e);
    });

    toysLink.addEventListener('click', (e: Event) => {
      preventDefault(e);
      document.dispatchEvent(new Event('render-filters'));
    });

    treeLink.addEventListener('click', (e: Event) => {
      preventDefault(e);
      document.dispatchEvent(new Event('render-tree'));
    });

    mainBtn.addEventListener('click', () => {
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
