import { createStore, applyMiddleware } from 'redux';
import rootReducer, { RootReducerState } from '.';
import { composeWithDevTools } from 'redux-devtools-extension';
import { actionCreators } from './actions';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { logicMiddleware } from './logic';

const composeEnhancers = composeWithDevTools({
  actionCreators,
});

export default <T>(context?: T) => createStore(rootReducer, composeEnhancers(
  applyMiddleware(
    thunk.withExtraArgument(context) as ThunkMiddleware<RootReducerState, any, T>,
    logicMiddleware,
  ),
));
