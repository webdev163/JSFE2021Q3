import Data from './data';
import MainPage from './pages/mainPage';

MainPage.render();

export default async () => {
  const result = await Data.getJson();
  return result;
};
