import MainPage from './pages/main/main';
import FiltersPage from './pages/filters/filters';
import TreePage from './pages/tree/tree';

document.addEventListener('render-main', () => {
  MainPage.render();
});

document.addEventListener('render-filters', () => {
  FiltersPage.render();
});

document.addEventListener('render-tree', () => {
  TreePage.render();
});
