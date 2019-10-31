import { MIN_SEARCH_QUERY_LENGTH } from './constants';

export const shouldQuery = (term: string) => (
  term.replace(/[^\w]/g, '').length >= MIN_SEARCH_QUERY_LENGTH
);
