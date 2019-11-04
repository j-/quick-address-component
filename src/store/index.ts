import { combineReducers } from 'redux';
import { QueryEntity, QueryResultEntity } from '../entities';
import * as addresses from './reducer-addresses';
import * as current from './reducer-current';
import * as interactions from './reducer-interactions';
import * as queries from './reducer-queries';
import * as queryResults from './reducer-query-results';
import { normalizeQuery } from '../normalize-query';
import { shouldQuery } from '../should-query';

export interface RootReducerState {
  addresses: addresses.ReducerState;
  current: current.ReducerState;
  interactions: interactions.ReducerState;
  queries: queries.ReducerState;
  queryResults: queryResults.ReducerState;
}

export default combineReducers<RootReducerState>({
  addresses: addresses.default,
  current: current.default,
  interactions: interactions.default,
  queries: queries.default,
  queryResults: queryResults.default,
});

/* Address selectors */

export const getAddressById = (state: RootReducerState, queryId: string) => (
  addresses.getAddressById(state.addresses, queryId)
);

/* Current selectors */

export const getAddressLine1 = (state: RootReducerState) => current.getAddressLine1(state.current);
export const getAddressLine2 = (state: RootReducerState) => current.getAddressLine2(state.current);
export const getSuburb = (state: RootReducerState) => current.getSuburb(state.current);
export const getState = (state: RootReducerState) => current.getState(state.current);
export const getPostcode = (state: RootReducerState) => current.getPostcode(state.current);
export const getActiveAddressId = (state: RootReducerState) => current.getActiveAddressId(state.current);

/* Interaction selectors */

export const isResultsDismissed = (state: RootReducerState) => interactions.isResultsDismissed(state.interactions);

/* Query selectors */

export const getQueryById = (state: RootReducerState, queryId: string) => (
  queries.getQueryById(state.queries, queryId)
);

export const hasQueriedFor = (state: RootReducerState, query: QueryEntity) => (
  queries.hasQueriedFor(state.queries, query)
);

export const shouldQueryFor = (state: RootReducerState, query: QueryEntity) => (
  queries.shouldQueryFor(state.queries, query)
);

export const getLastResolvedQuery = (state: RootReducerState) => (
  queries.getLastResolvedQuery(state.queries)
);

/* Query result selectors */

export const getQueryResultById = (state: RootReducerState, queryResultId: string) => (
  queryResults.getQueryResultById(state.queryResults, queryResultId)
);

export const getQueryResultsForQueryId = (state: RootReducerState, queryId: string) => (
  queryResults.getQueryResultsForQueryId(state.queryResults, queryId)
);

export const hasQueryResultsForQueryId = (state: RootReducerState, queryId: string) => (
  queryResults.hasQueryResultsForQueryId(state.queryResults, queryId)
);

/* Combined selectors */

export const getAddressQueryTerm = (state: RootReducerState) => getAddressLine1(state);

export const getEnteredQuery = (state: RootReducerState) => {
  const term = getAddressQueryTerm(state);
  const queryId = normalizeQuery(term);
  return getQueryById(state, queryId);
};

export const isEnteredQuerySignificant = (state: RootReducerState) => {
  const term = getAddressQueryTerm(state);
  return shouldQuery(term);
};

export const getLastResolvedQueryResults = (state: RootReducerState) => {
  const query = getLastResolvedQuery(state);
  if (!query) return [];
  return getQueryResultsForQueryId(state, query.id);
};

export const getAddressByQueryResultId = (state: RootReducerState, queryResultId: string) => {
  const queryResult = getQueryResultById(state, queryResultId);
  if (!queryResult) return null;
  const address = getAddressById(state, queryResult.addressId);
  if (!address) return null;
  return address;
};

export const getFirstCurrentQueryResult = (state: RootReducerState) => (
  getLastResolvedQueryResults(state)[0] || null
);

export const getHighlightedQueryResult = (state: RootReducerState) => {
  const addressId = getActiveAddressId(state);
  const results = getLastResolvedQueryResults(state);
  return (
    results.find((queryResult: QueryResultEntity) => queryResult.addressId === addressId) ||
    getFirstCurrentQueryResult(state)
  );
};

export const getHighlightedAddress = (state: RootReducerState) => {
  const queryResult = getHighlightedQueryResult(state);
  if (!queryResult) return null;
  return getAddressByQueryResultId(state, queryResult.id);
};

export const getAddressBeforeHighlighted = (state: RootReducerState) => {
  const currentAddress = getHighlightedAddress(state);
  if (!currentAddress) return null;
  const queryResults = getLastResolvedQueryResults(state);
  const currentIndex = queryResults.findIndex((queryResult: QueryResultEntity) => queryResult.addressId === currentAddress.id);
  const minIndex = 0;
  if (currentIndex <= minIndex) return null;
  const queryResult = queryResults[currentIndex - 1];
  return getAddressByQueryResultId(state, queryResult.id);
};

export const getAddressAfterHighlighted = (state: RootReducerState) => {
  const currentAddress = getHighlightedAddress(state);
  if (!currentAddress) return null;
  const queryResults = getLastResolvedQueryResults(state);
  const currentIndex = queryResults.findIndex((queryResult: QueryResultEntity) => queryResult.addressId === currentAddress.id);
  const maxIndex = queryResults.length - 1;
  if (currentIndex >= maxIndex) return null;
  const queryResult = queryResults[currentIndex + 1];
  return getAddressByQueryResultId(state, queryResult.id);
};

export const hasEnteredFullAddress = (state: RootReducerState) => (
  getAddressLine1(state) !== '' &&
  getSuburb(state) !== '' &&
  getState(state) !== '' &&
  getPostcode(state) !== ''
);

export const shouldShowSuggestions = (state: RootReducerState) => (
  // User has typed in something meaningful
  isEnteredQuerySignificant(state) &&
  // Must be something to show
  getLastResolvedQueryResults(state).length > 0 &&
  // User has not dismissed the results
  !isResultsDismissed(state)
);
