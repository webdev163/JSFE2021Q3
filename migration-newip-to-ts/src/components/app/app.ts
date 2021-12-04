import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { IData, ISources } from '../../interfaces';

class App {
  controller: AppController;
  view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start() {
    (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e: Event) =>
      this.controller.getNews(e, (data: IData) => this.view.drawNews(data))
    );
    this.controller.getSources((data: ISources) => this.view.drawSources(data));
  }
}

export default App;
