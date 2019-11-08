import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { quickAddressSearch } from '../api';
import Address from './Address';

storiesOf('Address', module)
  .add('Example', () => (
    <>
      <h1 className="mb-3">Residential address</h1>
      <Address search={quickAddressSearch} />
    </>
  ));
