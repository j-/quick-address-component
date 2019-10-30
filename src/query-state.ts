/** Tracks where a query is in its request/response life cycle. */
export enum QueryState {
  /** This query has been initialized but a request has not yet been made. */
  DEFAULT = 'DEFAULT',
  /** A request has been made for this query but it has not yet resolved. */
  PENDING = 'PENDING',
  /** The query request was responded to successfully. */
  SUCCESS = 'SUCCESS',
  /** An error occurred after the request was made. */
  FAILURE = 'FAILURE',
}
