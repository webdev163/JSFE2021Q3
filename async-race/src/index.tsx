import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
// import AsyncRaceService from './services/AsyncRaceService';

ReactDOM.render(<App />, document.getElementById('app'));

window.addEventListener('message', e => {
  if (e.data && typeof e.data === 'string' && e.data.match(/webpackHotUpdate/)) {
    // eslint-disable-next-line no-console
    console.clear();
  }
});
