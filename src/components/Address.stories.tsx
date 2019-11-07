import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { quickAddressSearch } from '../api';
import Address from './Address';

storiesOf('Address', module)
  .add('Example', () => (
    <Address search={quickAddressSearch} />
  ));
