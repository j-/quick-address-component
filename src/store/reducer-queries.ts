import { Reducer } from 'redux';
import { EntityMap, QueryEntity } from '../entities';
import { normalizeQuery } from "../normalize-query";
import { QueryState } from '../query-state';
import { isActionQueryStart, isActionQuerySuccess, isActionQueryError, isActionSetAddressLine1 } from './actions';
import { shouldQuery } from '../should-query';

export interface ReducerState {
  lastRequested: QueryEntity | null;
  lastResolved: QueryEntity | null;
  entities: EntityMap<QueryEntity>;
}

const DEFAULT_STATE: ReducerState = {
  lastRequested: null,
  lastResolved: null,
  entities: {},
};

const reducer: Reducer<ReducerState> = (state = DEFAULT_STATE, action) => {
  if (isActionSetAddressLine1(action)) {
    const { entities } = state;
    const term = action.data.addressLine1;
    const normalized = normalizeQuery(term);
    const id = normalized;
    const query = entities[id];
    return {
      ...state,
      entities: {
        ...entities,
        [normalized]: {
          id,
          term,
          normalized,
          state: null,
          ...query,
        },
      },
    };
  }

  if (isActionQueryStart(action)) {
    const { query } = action.data;
    return {
      ...state,
      lastRequested: query,
      didLastRequestResolve: false,
      entities: {
        ...state.entities,
        [query.id]: {
          ...query,
          state: QueryState.PENDING,
        },
      },
    };
  }

  if (isActionQuerySuccess(action)) {
    const { query } = action.data;
    const { lastRequested } = state;
    let { lastResolved } = state;
    if (lastRequested && lastRequested.id === query.id) {
      lastResolved = query;
    }
    return {
      ...state,
      lastResolved,
      entities: {
        ...state.entities,
        [query.id]: {
          ...query,
          state: QueryState.SUCCESS,
        },
      },
    };
  }

  if (isActionQueryError(action)) {
    const { query, error } = action.data;
    return {
      ...state,
      entities: {
        ...state.entities,
        [query.id]: {
          ...query,
          state: QueryState.FAILURE,
          error,
        },
      },
    };
  }

  return state;
};

export default reducer;

export const getQueryById = (state: ReducerState, queryId: string): QueryEntity | null => (
  state.entities[queryId] || null
);

export const hasQueriedFor = (state: ReducerState, query: QueryEntity): boolean => (
  state.entities[query.id] !== undefined
);

export const shouldQueryFor = (_state: ReducerState, query: QueryEntity): boolean => (
  shouldQuery(query.normalized)
);

export const getLastResolvedQuery = (state: ReducerState): QueryEntity | null => (
  state.lastResolved
);
