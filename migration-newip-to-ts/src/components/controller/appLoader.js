import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '2f64c80d64dc4164889c06bac3af50be',
        });
    }
}

export default AppLoader;
