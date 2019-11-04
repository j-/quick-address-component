import { QueryEntity } from './entities';

/**
 * Normalizes a query term (what the user typed in) to its canonical form.
 * Will allow two queries to be considered the same despite differences in
 * whitespace, upper/lower case, special characters etc.
 *
 * @example
 *
 * normalizeQuery('833  collins st'); // => "833 collins st"
 * normalizeQuery('833 Collins St.'); // => "833 collins st"
 */
export const normalizeQuery = (query: string): QueryEntity['id'] => (
  query
    // Remove insignificant characters
    // Keep words, digits, and whitespace
    .replace(/[^\w\d\s]/g, ' ')
    // Trim leading whitespace
    .replace(/^\s*/, '')
    // Trim trailing whitespace
    .replace(/\s*$/, '')
    // Collapse multiple whitespace chars
    .replace(/\s+/g, ' ')
    // Convert to consistent case
    .toLowerCase()
);
