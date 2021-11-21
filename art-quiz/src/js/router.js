import MainPage from './pages/mainPage';
import PicturesCategories from './pages/picturesCategories';
import ArtistQuiz from './pages/artistquiz';
import CategoryResults from './pages/categoryResults';
import ArtistCategories from './pages/artistCategories';
import Settings from './pages/settings';
import PicturesQuiz from './pages/picturesquiz';

document.addEventListener('render-main', () => {
  MainPage.render();
});

document.addEventListener('render-settings', () => {
  Settings.render();
});

document.addEventListener('render-artist-categories', () => {
  ArtistCategories.render();
});

document.addEventListener('render-pictures-categories', () => {
  PicturesCategories.render();
});

document.addEventListener('render-category-results', e => {
  CategoryResults.render(e.detail);
});

document.addEventListener('render-quiz', e => {
  const quiz = e.detail < 12 ? new ArtistQuiz(e.detail) : new PicturesQuiz(e.detail);
  quiz.render();
});
