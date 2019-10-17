import * as React from 'react';
import { storiesOf } from '@storybook/react';
import AddressSuggestion from './AddressSuggestion';

storiesOf('AddressSuggestion', module)
  .add('Default', () => (
    <AddressSuggestion isHighlighted={false}>833 Collins Street, DOCKLANDS VIC 3008</AddressSuggestion>
  ))
  .add('Highlighted', () => (
    <AddressSuggestion isHighlighted={true}>833 Collins Street, DOCKLANDS VIC 3008</AddressSuggestion>
  ));
