import * as React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { Provider as StoreProvider } from 'react-redux';
import createStore from '../src/store/create';
import 'bootstrap/dist/css/bootstrap.css';
import '../src/styles.css';

// Automatically import all files ending in *.stories.*
configure(require.context('../src', true, /\.stories\..+$/), module);

addDecorator((storyFn) => (
  <StoreProvider store={createStore()}>
    {storyFn()}
  </StoreProvider>
));
