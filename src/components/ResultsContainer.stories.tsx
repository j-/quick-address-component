import * as React from 'react';
import { storiesOf } from '@storybook/react';
import ResultsContainer from './ResultsContainer';

storiesOf('ResultsContainer', module)
  .add('Empty container', () => (
    <ResultsContainer />
  ));
