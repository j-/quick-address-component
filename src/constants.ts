/**
 * Makes requests to this host.
 *
 * * https://creditcardapp.anz.com/ (COLA Prod)
 */
export const API_HOST = 'http://localhost:8080/';

/**
 * The minimum number of significant characters a user must type before a
 * search is initiated.
 */
export const MIN_SEARCH_QUERY_LENGTH = 3;

/**
 * The maximum number of results that should be returned by the service.
 */
export const MAX_SEARCH_RESULTS = 5;

/**
 * How much time to wait after a key is pressed before a query is made.
 *
 * Too short and many queries will fire, degrading the customer experience.
 *
 * Too long and queries will feel slow, also degrading the customer experience.
 */
export const INPUT_DEBOUNCE_MS = 100;
