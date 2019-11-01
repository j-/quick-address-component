import { Reducer } from 'redux';
import { EntityMap, QueryEntity, Results } from '../entities';
import { QueryState } from '../query-state';
import { isActionQueryStart, isActionQuerySuccess, isActionQueryError } from './actions';
import { shouldQuery } from '../should-query';
import { squashHistory } from '../squash-history';

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
    let { history, entities } = state;
    const { query } = action.data;
    const { id } = query;
    entities = {
      ...entities,
      [id]: {
        state: QueryState.PENDING,
        ...query,
      },
    };
    history = [ id, ...history ];
    history = squashHistory(history, entities);
    return {
      ...state,
      history,
      entities,
    };
  }

  if (isActionQuerySuccess(action)) {
    let { history, entities } = state;
    const { query } = action.data;
    const { id } = query;
    entities = {
      ...entities,
      [id]: {
        ...query,
        state: QueryState.SUCCESS,
      },
    };
    history = squashHistory(history, entities);
    return {
      ...state,
      history,
      entities,
    };
  }

  if (isActionQueryError(action)) {
    let { history, entities } = state;
    const { query, error } = action.data;
    const { id } = query;
    entities = {
      ...entities,
      [id]: {
        ...query,
        state: QueryState.FAILURE,
        error,
      },
    };
    history = squashHistory(history, entities);
    return {
      ...state,
      history,
      entities,
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
  state.history
    .map((id) => state.entities[id])
    .find((query) => query.state === QueryState.SUCCESS) || null
);
