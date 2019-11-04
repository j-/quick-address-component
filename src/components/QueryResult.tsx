import * as React from 'react';
import AddressSuggestion from './AddressSuggestion';
import { useSelector, useDispatch } from 'react-redux';
import { getAddressByQueryResultId, RootReducerState, getHighlightedAddress, getEnteredQuery } from '../store';
import { AddressEntity } from '../entities';
import { selectAddressId } from '../store/actions';
import SuggestionText from './SuggestionText';

export interface Props {
  queryResultId: string;
}

const QueryResult: React.FC<Props> = ({ queryResultId }) => {
  const dispatch = useDispatch();
  const address = useSelector<RootReducerState, AddressEntity | null>((state) => getAddressByQueryResultId(state, queryResultId));
  const query = useSelector(getEnteredQuery);
  const highlightedAddress = useSelector(getHighlightedAddress);
  if (!address || !query) return null;
  const isHighlighted = highlightedAddress !== null && highlightedAddress.id === address.id;
  const handleClick: React.MouseEventHandler = (e) => {
    e.preventDefault();
    dispatch(selectAddressId(address.id));
  };
  return (
    <AddressSuggestion isHighlighted={isHighlighted} onClick={handleClick}>
      <SuggestionText queryTerm={query.term} addressLabel={address.label} />
    </AddressSuggestion>
  );
};

export default QueryResult;
