import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { ArticlesInterface, SourcesInterface } from '../../types';

class App {
  controller: AppController;
  view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  public start(): void {
    (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e: Event): void => {
      this.controller.getNews(e, (data: ArticlesInterface): void => this.view.drawNews(data));
      this.togglePopup();
    });
    (document.querySelector('.hamburger') as HTMLElement).addEventListener('click', (): void => {
      this.togglePopup();
    });
    this.controller.getSources((data: SourcesInterface) => this.view.drawSources(data));
    this.togglePopup();
  }

  public togglePopup(): void {
    const popup: HTMLElement = document.querySelector('.popup') as HTMLElement;
    const overlay: HTMLElement = document.querySelector('#overlay') as HTMLElement;
    const hamburger: HTMLElement = document.querySelector('.hamburger') as HTMLElement;
    const arr: HTMLElement[] = [popup, overlay, hamburger];
    setTimeout(() => {
      arr.forEach((el) => el.classList.toggle('active'));
    }, 200);
  }
}

export default App;
