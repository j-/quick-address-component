import * as React from 'react';
import { useSelector } from 'react-redux';
import { getAddressByQueryResultId, RootReducerState, getQueryByQueryResultId } from '../store';
import { AddressEntity, QueryEntity } from '../entities';
import SuggestionText from './SuggestionText';

export interface Props {
  queryResultId: string;
}

const slice = (value: string, i: number) => [
  value.substring(0, i),
  value.substring(i),
];

const SuggestionTextContainer: React.FC<Props> = ({ queryResultId }) => {
  const address = useSelector<RootReducerState, AddressEntity | null>((state) => getAddressByQueryResultId(state, queryResultId));
  const query = useSelector<RootReducerState, QueryEntity | null>((state) => getQueryByQueryResultId(state, queryResultId));

  if (!address || !query) return null;

  return <SuggestionText queryTerm={query.term} addressLabel={address.label} />;
};

export default SuggestionTextContainer;
