import { configure } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.css';
import '../src/styles.css';

// Automatically import all files ending in *.stories.*
configure(require.context('../src', true, /\.stories\..+$/), module);
