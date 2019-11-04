import * as React from 'react';
import AddressSuggestion from './AddressSuggestion';
import SuggestionTextContainer from './SuggestionTextContainer';
import { useSelector, useDispatch } from 'react-redux';
import { getAddressByQueryResultId, RootReducerState, getHighlightedAddress, getEnteredQuery } from '../store';
import { AddressEntity } from '../entities';
import { parsePartialAddress } from '../parse-partial-address';
import { setAddress } from '../store/actions';

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
    const values = parsePartialAddress(address.partial);
    if (values) dispatch(setAddress(values));
  };
  return (
    <AddressSuggestion
      isHighlighted={isHighlighted}
      onClick={handleClick}
    >
      <SuggestionTextContainer
        addressId={address.id}
        queryId={query.id}
      />
    </AddressSuggestion>
  );
};

export default QueryResult;
