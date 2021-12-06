import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://nodenews.herokuapp.com/', {
      apiKey: '84c58eafc7264586961295f555271c9f',
    });
  }
}

export default AppLoader;
