import * as React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import createStore from '../store/create';
import { AddressSearchOptions, AddressSearchResults } from '../api';
import AddressGroup from './AddressGroup';

export interface Props {
  search: (term: string, options?: AddressSearchOptions) => Promise<AddressSearchResults>;
}

const Address: React.FC<Props> = (props) => {
  const storeRef = React.useRef(createStore(props));
  return (
    <StoreProvider store={storeRef.current}>
      <AddressGroup />
    </StoreProvider>
  );
};

export default Address;
