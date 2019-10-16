import { Middleware } from 'redux';
import { buildQueryEntity } from '../query';
import { RootReducerState, getAddressQueryTerm, shouldQueryFor, getQueryById } from '.';
import { isActionSetAddressLine1, query, dismissResults } from './actions';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const INPUT_DEBOUNCE_MS = 250;

export const logicMiddleware: Middleware<void, RootReducerState> = ({ getState, dispatch }) => (next) => async (action) => {
  next(action);
  
  if (!isActionSetAddressLine1(action)) {
    // From this point on we only care about address line 1.
    // Exit early.
    return;
  }

  await delay(INPUT_DEBOUNCE_MS);

  const term = getAddressQueryTerm(getState());

  if (term !== action.data.addressLine1) {
    // Term has changed since debounce fired.
    // Exit early.
    return;
  }

  let queryEntity = buildQueryEntity(term);
  let storedQuery = getQueryById(getState(), queryEntity.id);

  if (storedQuery !== null) {
    queryEntity = storedQuery;
  }

  const shouldQuery = shouldQueryFor(getState(), queryEntity);

  if (!shouldQuery) {
    // No need to query for this (term too short).
    dispatch(dismissResults());
    return;
  }

  query(queryEntity)(dispatch, getState);
};
