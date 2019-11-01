import { QueryState } from './query-state';

export interface Entity {
  id: string;
}

export interface EntityMap<T extends Entity> {
  [entityId: string]: T;
}

export interface Results<T extends Entity> extends Array<T['id']> {}

export interface QueryEntity extends Entity {
  /** Normalized query string */
  id: string;
  /** Full query string */
  term: string;
  /** Normalized query string */
  normalized: string;
  /** Status of this query */
  state: QueryState;
  /** Error message when something goes bad */
  error: string | null;
}

export type HasQueryEntities = {
  queries: EntityMap<QueryEntity>;
}

export interface AddressEntity extends Entity {
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

export interface QueryResultEntity extends Entity {
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
