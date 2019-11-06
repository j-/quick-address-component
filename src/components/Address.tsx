import * as React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import createStore from '../store/create';
import AddressGroup from './AddressGroup';

export interface Props {

}

const Address: React.FC<Props> = () => {
  const storeRef = React.useRef(createStore());
  return (
    <StoreProvider store={storeRef.current}>
      <AddressGroup />
    </StoreProvider>
  );
};

export default Address;
