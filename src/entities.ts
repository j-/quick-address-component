import { QueryState } from './query-state';

/**
 * Represents an entity in the data model. All entities must refer to each
 * other by ID only.
 */
export interface Entity {
  id: string;
}

/**
 * An object indexed by entity ID where each value is an object of that entity.
 */
export interface EntityMap<T extends Entity = Entity> {
  [entityId: string]: T;
}

/**
 * Array of entity IDs.
 */
export interface Results<T extends Entity = Entity> extends Array<T['id']> {}

/**
 * Queries are what the user types in.
 */
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

/**
 * Addresses map to physical locations.
 */
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

/**
 * Query results map queries to addresses. They include a `score` which
 * indicates how closely the result matches the query.
 */
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
