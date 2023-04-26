import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import MyKlad from './App';
import { store } from './app/store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <MyKlad />
    </Provider>
  </React.StrictMode>
);
