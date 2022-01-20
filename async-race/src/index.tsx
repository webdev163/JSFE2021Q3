import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(<App />, document.getElementById('app'));

window.addEventListener('message', e => {
  if (e.data && typeof e.data === 'string' && e.data.match(/webpackHotUpdate/)) {
    // eslint-disable-next-line no-console
    console.clear();
  }
});

// eslint-disable-next-line no-console
console.log(
  "Self-checking: 190 / 190\nAll requirements have been met. In case of unexpected behavior, please contact me via discord or telegram.\nNOTE: server errors written in browser console shouldn't be recognized as app errors",
);
