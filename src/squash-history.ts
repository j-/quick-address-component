import { Results, QueryEntity, EntityMap } from './entities';
import { QueryState } from './query-state';

/**
 * Takes an array of strings, each representing a query identifier, as well as
 * a map of query entities, and returns a copy of the array but with all
 * resolved queries (except the most recent one) removed.
 *
 * Query history is used to determine which query results to show. Only results
 * for the most recent resolved query are shown. Once a more recent query is
 * resolved, older queries can be discarded. All pending queries are kept.
 *
 * @param history Array of query IDs in reverse chronological order (newest to
 * oldest)
 *
 * @param entities Entity map containing all the queries and their state
 * indexed by ID
 */
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
