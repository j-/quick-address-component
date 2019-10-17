import * as React from 'react';
import { render } from 'react-dom';
import createStore from './store/create';
import { Provider as StoreProvider } from 'react-redux';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';

const store = createStore();

render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
  document.getElementById('root'),
);
