import { Results, QueryEntity, EntityMap } from './entities';
import { QueryState } from './query-state';

export const squashHistory = (history: Results<QueryEntity>, entities: EntityMap<QueryEntity>): Results<QueryEntity> => {
  const result: Results<QueryEntity> = [];
  let foundSuccess = false;

  for (const queryId of history) {
    const query = entities[queryId];
    // No query in the entity map. Skip this query.
    if (!query) {
      continue;
    }
    // Query is yet to be resolved.
    if (query.state === QueryState.DEFAULT  || query.state === QueryState.PENDING) {
      result.push(queryId);
    }
    // Query has resolved successfully and is the only one so far.
    if (query.state === QueryState.SUCCESS && !foundSuccess) {
      foundSuccess = true;
      result.push(queryId);
    }
  }

  return result;
};
