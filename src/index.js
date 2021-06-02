import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Spinner } from './components/molecules/spinner';

import store from './store';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
    <Spinner />
  </Provider>,
  document.getElementById('root'),
);
