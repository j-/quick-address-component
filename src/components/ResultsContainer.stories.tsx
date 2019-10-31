import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ResultsContainer from './ResultsContainer';

storiesOf('ResultsContainer', module)
  .add('Empty container', () => (
    <ResultsContainer onClickDismiss={action('onClickDismiss')} />
  ));
