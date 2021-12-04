import News from './news/news';
import Sources from './sources/sources';
import { IData, ISources, IArticlesObj, ISourcesObj } from '../../interfaces';

export class AppView {
  news: News;
  sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  drawNews(data: IData) {
    const values: IArticlesObj[] = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  drawSources(data: ISources) {
    const values: ISourcesObj[] = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
