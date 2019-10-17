import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import SuggestionText from './SuggestionText';

storiesOf('SuggestionText', module)
  .add('No match', () => (
    <SuggestionText
      addressLabel={text('addressLabel', '833 Collins Street, DOCKLANDS VIC 3008')}
      queryTerm={text('queryTerm', 'notfound')}
    />
  ))
  .add('Street name', () => (
    <SuggestionText
      addressLabel={text('addressLabel', '833 Collins Street, DOCKLANDS VIC 3008')}
      queryTerm={text('queryTerm', 'collins')}
    />
  ))
  .add('Street type (partial)', () => (
    <SuggestionText
      addressLabel={text('addressLabel', '833 Collins Street, DOCKLANDS VIC 3008')}
      queryTerm={text('queryTerm', 'collins st')}
    />
  ))
  .add('Street type', () => (
    <SuggestionText
      addressLabel={text('addressLabel', '833 Collins Street, DOCKLANDS VIC 3008')}
      queryTerm={text('queryTerm', 'collins street')}
    />
  ));
