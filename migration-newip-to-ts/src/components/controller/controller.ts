import AppLoader from './appLoader';
import { CallbackFunctionGeneric } from '../../types';

class AppController extends AppLoader {
  public getSources<SourcesInterface>(callback: CallbackFunctionGeneric<SourcesInterface>): void {
    super.getResp(
      {
        endpoint: 'sources',
      },
      callback
    );
  }

  public getNews<ArticlesInterface>(e: Event, callback: CallbackFunctionGeneric<ArticlesInterface>): void {
    let target: HTMLElement = e.target as HTMLElement;
    const newsContainer: HTMLElement = e.currentTarget as HTMLElement;

    while (target !== newsContainer && target !== null) {
      if (target.classList.contains('source__item')) {
        const sourceId: string = <string>target.getAttribute('data-source-id');
        if (newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);
          super.getResp(
            {
              endpoint: 'everything',
              options: {
                sources: sourceId,
              },
            },
            callback
          );
        }
        return;
      }
      target = <HTMLElement>target.parentNode;
    }
  }
}

export default AppController;
