import News from './news/news';
import Sources from './sources/sources';
import { ArticlesInterface, SourcesInterface, ArticlesObjInterface, SourcesObjInterface } from '../../types';

export class AppView {
  news: News;
  sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  public drawNews(data: ArticlesInterface): void {
    const values: ArticlesObjInterface[] = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  public drawSources(data: Pick<SourcesInterface, 'status' | 'sources'>): void {
    const values: SourcesObjInterface[] = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
