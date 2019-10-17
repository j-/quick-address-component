import * as React from 'react';
import { storiesOf } from '@storybook/react';
import SuggestionText from './SuggestionText';

storiesOf('SuggestionText', module)
  .add('No match', () => (
    <SuggestionText
      addressLabel="833 Collins Street, DOCKLANDS VIC 3008"
      queryTerm="notfound"
    />
  ))
  .add('Street name', () => (
    <SuggestionText
      addressLabel="833 Collins Street, DOCKLANDS VIC 3008"
      queryTerm="collins"
    />
  ))
  .add('Street type (partial)', () => (
    <SuggestionText
      addressLabel="833 Collins Street, DOCKLANDS VIC 3008"
      queryTerm="collins st"
    />
  ))
  .add('Street type', () => (
    <SuggestionText
      addressLabel="833 Collins Street, DOCKLANDS VIC 3008"
      queryTerm="collins street"
    />
  ));
