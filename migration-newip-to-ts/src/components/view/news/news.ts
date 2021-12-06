import './news.css';
import { IArticlesObj } from '../../../types';
import '../../../img/no-image-placeholder.svg';

class News {
  public draw(data: IArticlesObj[]): void {
    const news: IArticlesObj[] = data.length >= 10 ? data.filter((_item: IArticlesObj, idx: number) => idx < 10) : data;

    const fragment: DocumentFragment = document.createDocumentFragment();
    const newsItemTemp: HTMLTemplateElement = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

    news.forEach((item: IArticlesObj, idx: number): void => {
      const newsClone: HTMLElement = newsItemTemp.content.cloneNode(true) as HTMLElement;

      if (idx % 2) (newsClone.querySelector('.news__item') as HTMLElement).classList.add('alt');

      const newsMetaPhoto = newsClone.querySelector('.news__meta-photo');

      if (item.urlToImage !== null && item.urlToImage !== 'null') {
        (newsMetaPhoto as HTMLElement).style.backgroundImage = `url(${item.urlToImage})`;
      } else {
        (newsMetaPhoto as HTMLElement).style.backgroundImage = 'url(img/no-image-placeholder.svg)';
        (newsMetaPhoto as HTMLElement).setAttribute('data-no-image', 'true');
      }

      (newsClone.querySelector('.news__meta-author') as HTMLElement).textContent =
        item.author || item.source.name || '';
      (newsClone.querySelector('.news__meta-date') as HTMLElement).textContent =
        item.publishedAt.slice(0, 10).split('-').reverse().join('-') || '';

      (newsClone.querySelector('.news__description-title') as HTMLElement).textContent = item.title || '';
      (newsClone.querySelector('.news__description-source') as HTMLElement).textContent = item.source.name || '';
      (newsClone.querySelector('.news__description-content') as HTMLElement).textContent = item.description || '';
      (newsClone.querySelector('.news__read-more a') as HTMLElement).setAttribute('href', item.url);

      fragment.append(newsClone);
    });

    (document.querySelector('.news') as HTMLElement).innerHTML = '';
    (document.querySelector('.news') as HTMLElement).appendChild(fragment);
  }
}

export default News;
