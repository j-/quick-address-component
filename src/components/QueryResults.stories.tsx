import * as React from 'react';
import { storiesOf } from '@storybook/react';
import QueryResults from './QueryResults';
import createStore from '../store/create';
import * as actions from '../store/actions';
import { QueryEntity, EntityMap, AddressEntity, QueryResultEntity } from '../entities';
import { Provider as StoreProvider } from 'react-redux';
import { text } from '@storybook/addon-knobs';

const a1: AddressEntity = {
  id: 'a1',
  label: 'Shop 1p 833 Collins Street, DOCKLANDS VIC 3008',
  partial: 'Shop 1p 833 Collins Street, DOCKLANDS VIC 3008',
};

const a2: AddressEntity = {
  id: 'a2',
  label: 'Shop 2p 833 Collins Street, DOCKLANDS VIC 3008',
  partial: 'Shop 2p 833 Collins Street, DOCKLANDS VIC 3008',
};

const a3: AddressEntity = {
  id: 'a3',
  label: 'Shop 3p 833 Collins Street, DOCKLANDS VIC 3008',
  partial: 'Shop 3p 833 Collins Street, DOCKLANDS VIC 3008',
};

const a4: AddressEntity = {
  id: 'a4',
  label: 'Shop 4p 833 Collins Street, DOCKLANDS VIC 3008',
  partial: 'Shop 4p 833 Collins Street, DOCKLANDS VIC 3008',
};

const a5: AddressEntity = {
  id: 'a5',
  label: 'Shop 5p 833 Collins Street, DOCKLANDS VIC 3008',
  partial: 'Shop 5p 833 Collins Street, DOCKLANDS VIC 3008',
};

const q1a1: QueryResultEntity = {
  id: 'q1:a1',
  queryId: 'q1',
  addressId: 'a1',
  score: 100,
};

const q1a2: QueryResultEntity = {
  id: 'q1:a2',
  queryId: 'q1',
  addressId: 'a2',
  score: 100,
};

const q1a3: QueryResultEntity = {
  id: 'q1:a3',
  queryId: 'q1',
  addressId: 'a3',
  score: 100,
};

const q1a4: QueryResultEntity = {
  id: 'q1:a4',
  queryId: 'q1',
  addressId: 'a4',
  score: 100,
};

const q1a5: QueryResultEntity = {
  id: 'q1:a5',
  queryId: 'q1',
  addressId: 'a5',
  score: 100,
};

storiesOf('QueryResults', module)
  .add('0 results', () => (
    <QueryResults />
  ))
  .add('3 results', () => {
    const store = createStore();

    const query: QueryEntity = {
      id: 'q1',
      term: text('query', '833 collins st'),
      normalized: text('query', '833 collins st'),
      state: null,
      error: null,
    };

    const addresses: EntityMap<AddressEntity> = {
      'a1': a1,
      'a2': a2,
      'a3': a3,
    };

    const queryResults: EntityMap<QueryResultEntity> = {
      'q1:a1': q1a1,
      'q1:a2': q1a2,
      'q1:a3': q1a3,
    };

    const entities = { addresses, queryResults };

    store.dispatch<actions.ActionQueryStart>({
      type: actions.ACTION_QUERY_START,
      data: {
        query,
      },
    });

    store.dispatch<actions.ActionQuerySuccess>({
      type: actions.ACTION_QUERY_SUCCESS,
      data: {
        query,
        entities,
      },
    });

    return (
      <StoreProvider store={store}>
        <QueryResults />
      </StoreProvider>
    );
  })
  .add('5 results', () => {
    const store = createStore();

    const query: QueryEntity = {
      id: 'q1',
      term: text('query', '833 collins st'),
      normalized: text('query', '833 collins st'),
      state: null,
      error: null,
    };

    const addresses: EntityMap<AddressEntity> = {
      'a1': a1,
      'a2': a2,
      'a3': a3,
      'a4': a4,
      'a5': a5,
    };

    const queryResults: EntityMap<QueryResultEntity> = {
      'q1:a1': q1a1,
      'q1:a2': q1a2,
      'q1:a3': q1a3,
      'q1:a4': q1a4,
      'q1:a5': q1a5,
    };

    const entities = { addresses, queryResults };

    store.dispatch<actions.ActionQueryStart>({
      type: actions.ACTION_QUERY_START,
      data: {
        query,
      },
    });

    store.dispatch<actions.ActionQuerySuccess>({
      type: actions.ACTION_QUERY_SUCCESS,
      data: {
        query,
        entities,
      },
    });

    return (
      <StoreProvider store={store}>
        <QueryResults />
      </StoreProvider>
    );
  });
