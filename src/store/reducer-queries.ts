import { Reducer } from 'redux';
import { EntityMap, QueryEntity } from '../entities';
import { MIN_SEARCH_QUERY_LENGTH } from '../constants';
import { normalizeQuery } from "../normalize-query";
import { QueryState } from '../query-state';
import { isActionQueryStart, isActionQuerySuccess, isActionQueryError, isActionSetAddressLine1 } from './actions';

export type ReducerState = EntityMap<QueryEntity>

const DEFAULT_STATE: ReducerState = {};

const reducer: Reducer<ReducerState> = (state = DEFAULT_STATE, action) => {
  if (isActionSetAddressLine1(action)) {
    const term = action.data.addressLine1;
    const normalized = normalizeQuery(term);
    const id = normalized;
    const query = state[id];
    return {
      ...state,
      [normalized]: {
        id,
        term,
        normalized,
        state: null,
        ...query,
      },
    };
  }

  if (isActionQueryStart(action)) {
    const { query } = action.data;
    return {
      ...state,
      [query.id]: {
        ...query,
        state: QueryState.PENDING,
      },
    };
  }

  if (isActionQuerySuccess(action)) {
    const { query } = action.data;
    return {
      ...state,
      [query.id]: {
        ...query,
        state: QueryState.SUCCESS,
      },
    };
  }

  if (isActionQueryError(action)) {
    const { query, error } = action.data;
    return {
      ...state,
      [query.id]: {
        ...query,
        state: QueryState.FAILURE,
        error,
      },
    };
  }

  return state;
};

export default reducer;

export const getQueryById = (state: ReducerState, queryId: string): QueryEntity | null => (
  state[queryId] || null
);

export const hasQueriedFor = (state: ReducerState, query: QueryEntity): boolean => (
  state[query.id] !== undefined
);

export const shouldQueryFor = (_state: ReducerState, query: QueryEntity): boolean => (
  query.normalized.length >= MIN_SEARCH_QUERY_LENGTH
);
