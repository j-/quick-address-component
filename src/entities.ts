import { QueryState } from './query-state';

export interface EntityMap<T> {
  [entityId: string]: T;
}

export interface QueryEntity {
  /** Normalized query string */
  id: string;
  /** Full query string */
  term: string;
  /** Normalized query string */
  normalized: string;
  /** Status of this query */
  state: QueryState | null;
  /** Error message when something goes bad */
  error: string | null;
}

export type HasQueryEntities = {
  queries: EntityMap<QueryEntity>;
}

export interface AddressEntity {
  /** Long identifier for this address */
  id: string;
  /** Display text for this address */
  label: string;
  /** Address as a single line */
  partial: string;
}

export type HasAddressEntities = {
  addresses: EntityMap<AddressEntity>;
}

export interface QueryResultEntity {
  /** Concatenate query and address ID */
  id: string;
  /** Query identifier */
  queryId: QueryEntity['id'];
  /** Address identifier */
  addressId: AddressEntity['id'];
  /** Integer between 0 and 100 */
  score: number;
}

export type HasQueryResultEntities = {
  queryResults: EntityMap<QueryResultEntity>;
}
