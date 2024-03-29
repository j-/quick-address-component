import { Middleware } from 'redux';
import { buildQueryEntity } from '../query';
import { INPUT_DEBOUNCE_MS } from '../constants';
import { RootReducerState, getAddressQueryTerm, shouldQueryFor, getQueryById, hasEnteredFullAddress } from '.';
import { isActionSetAddressLine1, query, dismissResults } from './actions';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

  const isAddressComplete = hasEnteredFullAddress(getState());

  if (isAddressComplete) {
    dismissResults()(dispatch, getState);
  }

  let queryEntity = buildQueryEntity(term);
  let storedQuery = getQueryById(getState(), queryEntity.id);

  if (storedQuery !== null) {
    queryEntity = storedQuery;
  }

  const shouldQuery = shouldQueryFor(getState(), queryEntity);

  if (!shouldQuery) {
    // No need to query for this (term too short).
    return;
  }

  query(queryEntity)(dispatch, getState);
};
