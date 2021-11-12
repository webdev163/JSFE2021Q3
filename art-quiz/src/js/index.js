import { Render } from './render';
import { Data } from './data';
import { ArtistQuiz } from './pages/artistquiz';
import { MainPage } from './pages/mainPage';

const data = new Data();
// const artistquiz = new ArtistQuiz(0);
const mainPage = new MainPage().render();

export const jsonData = async () => {
  const result = await data.getJson();
  return result;
};

