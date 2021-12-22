import Render from '../../render';
import treePageHtml from './tree.html';

export default class TreePage {
  private static setEventListeners(): void {
    const mainLink = document.querySelector('.main-link') as HTMLElement;
    const toysLink = document.querySelector('.toys-link') as HTMLElement;
    const treeLink = document.querySelector('.tree-link') as HTMLElement;

    mainLink.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      document.dispatchEvent(new Event('render-main'));
    })

    toysLink.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      document.dispatchEvent(new Event('render-filters'));
    })

    treeLink.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
    })
  }

  public static async render(): Promise<void> {
    const html: string = treePageHtml;
    await Render.render(html).then(() => {
      this.setEventListeners();
    });
  }

}
