import * as React from 'react';
import { QueryEntity } from '../entities';
import { QueryState } from '../query-state';
import RetryQueryButton from './RetryQueryButton';
import { useSelector } from 'react-redux';
import { getQueryById, RootReducerState } from '../store';

export interface Props {
  queryId: string;
}

const QueryStatus: React.FC<Props> = ({ queryId }) => {
  const query = useSelector<RootReducerState, QueryEntity | null>((state) => getQueryById(state, queryId));
  if (!query) return null;
  return (
    <div className="QueryStatus mt-3 mb-3">
      {query.state === QueryState.FAILURE && <>Error: {query.error} <RetryQueryButton queryId={query.id} /></>}
    </div>
  );
};

export default QueryStatus;
