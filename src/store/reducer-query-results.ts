import { Reducer } from 'redux';
import { EntityMap, QueryResultEntity } from '../entities';
import { isActionQuerySuccess } from './actions';

export type ReducerState = EntityMap<QueryResultEntity>

const DEFAULT_STATE: ReducerState = {};

const reducer: Reducer<ReducerState> = (state = DEFAULT_STATE, action) => {
  if (isActionQuerySuccess(action)) {
    const { entities } = action.data;
    return {
      ...state,
      ...entities.queryResults,
    };
  }

  return state;
};

export default reducer;

export const getQueryResultById = (state: ReducerState, queryResultId: string): QueryResultEntity => (
  state[queryResultId] || null
);

export const getQueryResultsForQueryId = (state: ReducerState, queryId: string): QueryResultEntity[] => (
  Object.keys(state)
    .map((id) => state[id])
    .filter((queryResult) => queryResult.queryId === queryId)
    // Descending order
    .sort((a, b) => b.score - a.score)
);

export const hasQueryResultsForQueryId = (state: ReducerState, queryId: string): boolean => (
  getQueryResultsForQueryId(state, queryId).length > 0
);
