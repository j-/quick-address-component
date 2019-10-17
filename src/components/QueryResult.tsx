import * as React from 'react';
import AddressSuggestion from './AddressSuggestion';
import SuggestionTextContainer from './SuggestionTextContainer';
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
  const address = useSelector<RootReducerState, AddressEntity | null>((state) => getAddressByQueryResultId(state, queryResultId));
  const highlightedAddress = useSelector(getHighlightedAddress);
  if (!address || !highlightedAddress) return null;
  const addressId = address.id;
  const isHighlighted = highlightedAddress.id === address.id;
  const handleClick: React.MouseEventHandler = (e) => {
    e.preventDefault();
    const values = breakdownAddress(address.partial);
    if (values) dispatch(setAddress(values));
  };
  return (
    <AddressSuggestion
      isHighlighted={isHighlighted}
      onClick={handleClick}
    >
      <SuggestionTextContainer queryResultId={queryResultId} />
    </AddressSuggestion>
  );
};

export default QueryResult;
