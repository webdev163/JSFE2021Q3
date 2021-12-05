import News from './news/news';
import Sources from './sources/sources';
import { IData, ISources, IArticlesObj, ISourcesObj } from '../../types';

export class AppView {
  news: News;
  sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  public drawNews(data: IData): void {
    const values: IArticlesObj[] = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  public drawSources(data: ISources): void {
    const values: ISourcesObj[] = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
