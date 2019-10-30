import * as React from 'react';
import { useSelector } from 'react-redux';
import { getAddressById, RootReducerState, getQueryById } from '../store';
import { AddressEntity, QueryEntity } from '../entities';
import SuggestionText from './SuggestionText';

export interface Props {
  addressId: string;
  queryId: string;
}

const SuggestionTextContainer: React.FC<Props> = ({ addressId, queryId }) => {
  const address = useSelector<RootReducerState, AddressEntity | null>((state) => getAddressById(state, addressId));
  const query = useSelector<RootReducerState, QueryEntity | null>((state) => getQueryById(state, queryId));

  if (!address || !query) return null;

  return <SuggestionText queryTerm={query.term} addressLabel={address.label} />;
};

export default SuggestionTextContainer;
