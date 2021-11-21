import Data from './data';
import MainPage from './pages/mainPage';
import Settings from './pages/settings';
import './router';

MainPage.render();
Settings.getLocalStorage();

export default async () => {
  const result = await Data.getJson();
  return result;
};
