import { Data } from './data';
import { MainPage } from './pages/mainPage';

MainPage.render();

export const jsonData = async () => {
  const result = await Data.getJson();
  return result;
};
