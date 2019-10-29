import { Reducer } from 'redux';
import { isActionDismissResults, isActionQuerySuccess, isActionSetAddress } from './actions';

export interface ReducerState {
  dismissResults: boolean;
}

const DEFAULT_STATE: ReducerState = {
  dismissResults: false,
}

const reducer: Reducer<ReducerState> = (state = DEFAULT_STATE, action) => {
  if (isActionDismissResults(action) || isActionSetAddress(action)) {
    return {
      ...state,
      dismissResults: true,
    };
  }

  if (isActionQuerySuccess(action)) {
    return {
      ...state,
      dismissResults: false,
    };
  }

  return state;
};

export default reducer;

export const isResultsDismissed = (state: ReducerState) => state.dismissResults;
