import * as React from 'react';
import AddressSuggestion from './AddressSuggestion';
import SuggestionText from './SuggestionText';
import { useSelector, useDispatch } from 'react-redux';
import { getAddressByQueryResultId, RootReducerState, getHighlightedAddress } from '../store';
import { AddressEntity } from '../entities';
import { breakdownAddress } from '../address';
import { setAddress } from '../store/actions';

export interface Props {
  queryResultId: string;
}

const QueryResult: React.FC<Props> = ({ queryResultId }) => {
  const dispatch = useDispatch();
  const address = useSelector<RootReducerState, AddressEntity>((state) => getAddressByQueryResultId(state, queryResultId));
  const highlightedAddress = useSelector(getHighlightedAddress);
  if (!address) return null;
  const addressId = address.id;
  const isHighlighted = highlightedAddress.id === address.id;
  const handleClick: React.MouseEventHandler = (e) => {
    e.preventDefault();
    const values = breakdownAddress(address.partial);
    if (values) dispatch(setAddress(values));
  };
  return (
    <AddressSuggestion
      addressId={addressId}
      isHighlighted={isHighlighted}
      onClick={handleClick}
    >
      <SuggestionText queryResultId={queryResultId} />
    </AddressSuggestion>
  );
};

export default QueryResult;
