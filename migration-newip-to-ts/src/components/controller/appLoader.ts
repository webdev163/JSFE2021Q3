import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://nodenews.herokuapp.com/', {
      apiKey: `${process.env.API_KEY}`,
    });
  }
}

export default AppLoader;
