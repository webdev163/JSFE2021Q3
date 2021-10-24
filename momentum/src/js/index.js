if (module.hot) {
  module.hot.accept();
}

import './time';
import './slider';
import './weather';
import './quotes';
import './audioplayer';
import './settings';
import './todolist';

window.onload = function () {
  setTimeout(() => {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
      document.body.classList.add('loaded');
      document.body.classList.remove('loaded_hiding');
    }, 500);
  }, 2000);
}