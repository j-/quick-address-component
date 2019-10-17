import { createStore, applyMiddleware } from 'redux';
import rootReducer, { RootReducerState } from '.';
import { composeWithDevTools } from 'redux-devtools-extension';
import { actionCreators } from './actions';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { logicMiddleware } from './logic';

const composeEnhancers = composeWithDevTools({
  actionCreators,
});

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk as ThunkMiddleware<RootReducerState>,
    logicMiddleware,
  ),
);

export default () => createStore(rootReducer, enhancer);
