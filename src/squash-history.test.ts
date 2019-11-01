import { squashHistory } from './squash-history';
import { QueryState } from './query-state';

const entities = {
  d1: {
    id: 'd1',
    term: 'default query 1',
    normalized: 'default query 1',
    state: QueryState.DEFAULT,
    error: null,
  },
  d2: {
    id: 'd2',
    term: 'default query 2',
    normalized: 'default query 2',
    state: QueryState.DEFAULT,
    error: null,
  },
  d3: {
    id: 'd3',
    term: 'default query 3',
    normalized: 'default query 3',
    state: QueryState.DEFAULT,
    error: null,
  },
  p1: {
    id: 'p1',
    term: 'pending query 1',
    normalized: 'pending query 1',
    state: QueryState.PENDING,
    error: null,
  },
  p2: {
    id: 'p2',
    term: 'pending query 2',
    normalized: 'pending query 2',
    state: QueryState.PENDING,
    error: null,
  },
  p3: {
    id: 'p3',
    term: 'pending query 3',
    normalized: 'pending query 3',
    state: QueryState.PENDING,
    error: null,
  },
  s1: {
    id: 's1',
    term: 'successful query 1',
    normalized: 'successful query 1',
    state: QueryState.SUCCESS,
    error: null,
  },
  s2: {
    id: 's2',
    term: 'successful query 2',
    normalized: 'successful query 2',
    state: QueryState.SUCCESS,
    error: null,
  },
  s3: {
    id: 's3',
    term: 'successful query 3',
    normalized: 'successful query 3',
    state: QueryState.SUCCESS,
    error: null,
  },
  e1: {
    id: 'e1',
    term: 'error query 1',
    normalized: 'error query 1',
    state: QueryState.FAILURE,
    error: null,
  },
  e2: {
    id: 'e2',
    term: 'error query 2',
    normalized: 'error query 2',
    state: QueryState.FAILURE,
    error: null,
  },
  e3: {
    id: 'e3',
    term: 'error query 3',
    normalized: 'error query 3',
    state: QueryState.FAILURE,
    error: null,
  },
};

it('returns an empty array as-is', () => {
  const actual = squashHistory([], entities);
  expect(actual).toEqual([]);
});

it('keeps all queries without state', () => {
  const actual = squashHistory(['d1', 'd2', 'd3'], entities);
  expect(actual).toEqual(['d1', 'd2', 'd3']);
});

it('removes all queries in error state', () => {
  const actual = squashHistory(['e1', 'e2', 'e3'], entities);
  expect(actual).toEqual([]);
});

it('removes all queries not in the entity map', () => {
  const actual = squashHistory(['z1', 'z2', 'z3'], entities);
  expect(actual).toEqual([]);
});

it('keeps all pending queries', () => {
  const actual = squashHistory(['p1', 'p2', 'p3'], entities);
  expect(actual).toEqual(['p1', 'p2', 'p3']);
});

it('keeps only one resolved query', () => {
  const actual = squashHistory(['p1', 's1', 'p2', 's2', 's3'], entities);
  expect(actual).toEqual(['p1', 's1', 'p2']);
});
