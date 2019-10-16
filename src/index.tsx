import * as React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import rootReducer, { RootReducerState } from './store';
import { composeWithDevTools } from 'redux-devtools-extension';
import { actionCreators } from './store/actions';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { logicMiddleware } from './store/logic';
import { Provider as StoreProvider } from 'react-redux';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';

const composeEnhancers = composeWithDevTools({
  actionCreators,
});

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk as ThunkMiddleware<RootReducerState>,
    logicMiddleware,
  ),
);

const store = createStore(rootReducer, enhancer);

render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
  document.getElementById('root'),
);
