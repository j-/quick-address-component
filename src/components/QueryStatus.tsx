import * as React from 'react';
import { QueryEntity } from '../entities';
import { QueryState } from '../query';
import RetryQueryButton from './RetryQueryButton';
import { useSelector } from 'react-redux';
import { getQueryById, hasQueryResultsForQueryId, RootReducerState } from '../store';

export interface Props {
  queryId: string;
}

const QueryStatus: React.FC<Props> = ({ queryId }) => {
  const query = useSelector<RootReducerState, QueryEntity>((state) => getQueryById(state, queryId));
  const hasResults = useSelector<RootReducerState, boolean>((state) => hasQueryResultsForQueryId(state, queryId));
  return (
    <div className="QueryStatus mt-3 mb-3">
      {query.state === QueryState.PENDING && <>Loading&hellip;</>}
      {query.state === QueryState.FAILURE && <>Error: {query.error} <RetryQueryButton queryId={query.id} /></>}
      {query.state === QueryState.SUCCESS && !hasResults && <>No suggestions</>}
    </div>
  );
};

export default QueryStatus;
