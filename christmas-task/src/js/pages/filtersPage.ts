import Render from '../render';
import filtersPageHtml from './filtersPage.html';

export default class FiltersPage {
  static setEventListeners(): void {
    (document.querySelector('.sort-select') as HTMLElement).addEventListener('mousedown', (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      this.runCustomDropdown();
    });
  }

  static runCustomDropdown(): void {
    const dropdown = <HTMLElement>document.querySelector('.custom-dropdown');
    const select = <HTMLSelectElement>document.querySelector('.sort-select');
    dropdown.classList.add('active');
    dropdown.addEventListener('click', (e: Event) => {
      const element = <HTMLElement>e.target;
      if (element.classList.contains('custom-dropdown-item')) {
        select.value = element.dataset.value as string;
        select.dispatchEvent(new Event('change'));
        dropdown.classList.remove('active');
      }
    });
  }

  static async render(): Promise<void> {
    const html = filtersPageHtml;
    await Render.render(html).then(() => {
      
    });
  }
}
