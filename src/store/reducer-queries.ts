import { Reducer } from 'redux';
import { EntityMap, QueryEntity, Results } from '../entities';
import { QueryState } from '../query-state';
import { isActionQueryStart, isActionQuerySuccess, isActionQueryError } from './actions';
import { shouldQuery } from '../should-query';

export interface ReducerState {
  history: Results<QueryEntity>;
  entities: EntityMap<QueryEntity>;
}

const DEFAULT_STATE: ReducerState = {
  history: [],
  entities: {},
};

const reducer: Reducer<ReducerState> = (state = DEFAULT_STATE, action) => {
  if (isActionQueryStart(action)) {
    const { history, entities } = state;
    const { query } = action.data;
    const { id } = query;
    return {
      ...state,
      history: [
        id,
        ...history,
      ],
      entities: {
        ...entities,
        [id]: {
          state: QueryState.PENDING,
          ...query,
        },
      },
    };
  }

  if (isActionQuerySuccess(action)) {
    const { entities } = state;
    const { query } = action.data;
    const { id } = query;
    return {
      ...state,
      entities: {
        ...entities,
        [id]: {
          ...query,
          state: QueryState.SUCCESS,
        },
      },
    };
  }

  if (isActionQueryError(action)) {
    const { entities } = state;
    const { query, error } = action.data;
    const { id } = query;
    return {
      ...state,
      entities: {
        ...entities,
        [id]: {
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

export const getLastResolvedQuery = (state: ReducerState): QueryEntity | null => {
  return state.history
    .map((id) => state.entities[id])
    .find((query) => query.state === QueryState.SUCCESS) || null;
};
