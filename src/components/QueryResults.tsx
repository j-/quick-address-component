import * as React from 'react';
import { useSelector } from 'react-redux';
import { getCurrentQueryResults, isResultsDismissed } from '../store';
import QueryResult from './QueryResult';
import { QueryResultEntity } from '../entities';
import ResultsContainer from './ResultsContainer';

export interface Props {

}

const QueryResults: React.FC = () => {
  const queryResults = useSelector(getCurrentQueryResults);
  const resultsDismissed = useSelector(isResultsDismissed);

  if (queryResults.length === 0 || resultsDismissed) {
    return null;
  }

  return (
    <ResultsContainer>
      <div className="QueryResults list-group list-group-flush">
        {queryResults.map((queryResult: QueryResultEntity) => (
          <QueryResult queryResultId={queryResult.id} key={queryResult.id} />
        ))}
      </div>
    </ResultsContainer>
  );
};

export default QueryResults;
