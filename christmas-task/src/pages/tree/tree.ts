import Render from '../../render';
import treePageHtml from './tree.html';

export default class TreePage {
  private static setEventListeners(): void {
    // (document.querySelector('.main-btn') as HTMLElement).addEventListener('click', () => {
    //   document.dispatchEvent(new Event('render-filters'));
    // })
  }

  public static async render(): Promise<void> {
    const html: string = treePageHtml;
    await Render.render(html).then(() => {
      this.setEventListeners();
    });
  }

}
