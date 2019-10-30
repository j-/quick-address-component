import { QueryEntity } from './entities';

export enum QueryState {
  DEFAULT = 'DEFAULT',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

export const normalizeQuery = (query: string) => {
  return query
    // Remove insignificant characters
    // Keep words, digits, and whitespace
    .replace(/[^\w\d\s]/g, '')
    // Trim leading and trailing whitespace
    .replace(/^\s*|\s*$/g, '')
    // Collapse multiple whitespace chars
    .replace(/\s+/g, ' ')
    // Convert to consistent case
    .toLowerCase();
};

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
