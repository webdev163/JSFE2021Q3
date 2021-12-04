import './sources.css';
import { ISourcesObj } from '../../../interfaces';

class Sources {
  draw(data: ISourcesObj[]): void {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const sourceItemTemp: HTMLTemplateElement = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

    if (sourceItemTemp) {
      data.forEach((item: ISourcesObj) => {
        const sourceClone: HTMLElement = sourceItemTemp.content.cloneNode(true) as HTMLElement;

        (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name || '';
        (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-source-id', item.id);

        fragment.append(sourceClone);
      });
    }

    (document.querySelector('.sources') as HTMLElement).append(fragment);
  }
}

export default Sources;
