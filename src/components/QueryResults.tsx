import * as React from 'react';
import { useSelector } from 'react-redux';
import { MAX_SEARCH_RESULTS } from '../constants';
import { getLastResolvedQueryResults, isResultsDismissed } from '../store';
import QueryResult from './QueryResult';
import { QueryResultEntity } from '../entities';
import ResultsContainer from './ResultsContainer';

export interface Props {

}

const QueryResults: React.FC = () => {
  const queryResults = useSelector(getLastResolvedQueryResults);
  const resultsDismissed = useSelector(isResultsDismissed);

  if (queryResults.length === 0 || resultsDismissed) {
    return null;
  }

  return (
    <ResultsContainer>
      <div className="QueryResults list-group list-group-flush">
        {queryResults.slice(0, MAX_SEARCH_RESULTS).map((queryResult: QueryResultEntity) => (
          <QueryResult queryResultId={queryResult.id} key={queryResult.id} />
        ))}
      </div>
    </ResultsContainer>
  );
};

export default QueryResults;
