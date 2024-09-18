import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalStyle } from './src/styles/GlobalStyle';
import store from './src/redux/store';
import {Provider} from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);