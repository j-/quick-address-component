import { QueryEntity } from './entities';
import { QueryState } from './query-state';
import { normalizeQuery } from './normalize-query';

export const buildQueryEntity = (term: string): QueryEntity => {
  const normalized = normalizeQuery(term);
  return {
    id: normalized,
    term,
    normalized,
    state: QueryState.DEFAULT,
    error: null,
  };
};
