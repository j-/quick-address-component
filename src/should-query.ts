import { MIN_SEARCH_QUERY_LENGTH } from './constants';

/**
 * Determines if a query should be made to the address service. Checks that
 * there is enough meaningful information in the query term to justify making a
 * request.
 *
 * Returns `true` if the number of letters meets or exceeds the minimum query
 * length requirement.
 *
 * @param term Query term. Does not need to be normalized. Can be exactly what
 * the user entered.
 *
 * @param [min] Optional minimum for query length. Used when being explicit
 * about length (e.g. in unit tests). Otherwise omit this to use the global
 * constant value.
 *
 * @example
 *
 * shouldQuery('833 co', 3); // => false
 * shouldQuery('833 collins', 3); // => true
 */
export const shouldQuery = (term: string, min: number = MIN_SEARCH_QUERY_LENGTH) => (
  (term.match(/[A-Za-z]/g) || []).length >= min
);
