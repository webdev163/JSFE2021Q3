import Data from './data';
import MainPage from './pages/mainPage';
import Settings from './pages/settings';
import './router';

const getData = async () => {
  const result = await Data.getJson();
  return result;
};

MainPage.render();
Settings.getLocalStorage();
export default getData();
