import { Render } from './render';
import { Data } from './data';
import { ArtistQuiz } from './artistquiz';

const data = new Data();
const artistquiz = new ArtistQuiz(5);

export const jsonData = async () => {
  const result = await data.getJson();
  return result;
};

artistquiz.render();


