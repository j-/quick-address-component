import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider as StoreProvider } from 'react-redux';
import createStore from '../store/create';
import App from './App';

const store = createStore();

storiesOf('App', module)
  .add('Default', () => (
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  ));
