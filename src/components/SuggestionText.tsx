import * as React from 'react';
import { useSelector } from 'react-redux';
import { getAddressByQueryResultId, RootReducerState, getQueryByQueryResultId } from '../store';
import { AddressEntity, QueryEntity } from '../entities';

export interface Props {
  queryResultId: string;
}

const slice = (value: string, i: number) => [
  value.substring(0, i),
  value.substring(i),
];

const SuggestionText: React.FC<Props> = ({ queryResultId }) => {
  const address = useSelector<RootReducerState, AddressEntity | null>((state) => getAddressByQueryResultId(state, queryResultId));
  const query = useSelector<RootReducerState, QueryEntity | null>((state) => getQueryByQueryResultId(state, queryResultId));

  if (!address || !query) return null;

  const { term } = query;
  const { label } = address;
  const queryTokens = term.split(/[^\w\d]+/g).map((token) => token.toLowerCase());

  const children = label
    .split(/([^\w\d]+)/g)
    .map((labelToken) => {
      const lowerCaseQueryToken = labelToken.toLowerCase();
      const queryToken = queryTokens.find((queryToken) => lowerCaseQueryToken.startsWith(queryToken));
      if (queryToken === undefined) {
        return labelToken;
      } else if (queryToken === labelToken) {
        return <strong>{labelToken}</strong>;
      } else {
        const [before, after] = slice(labelToken, queryToken.length);
        return <><strong>{before}</strong>{after}</>;
      }
    })
    .map((child, i) => (
      <React.Fragment key={i}>
        {child}
      </React.Fragment>
    ));

  return <>{children}</>;
};

export default SuggestionText;
