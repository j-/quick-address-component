import * as React from 'react';
import { useSelector } from 'react-redux';
import { MAX_SEARCH_RESULTS } from '../constants';
import { getLastResolvedQueryResults, isResultsDismissed, isEnteredQuerySignificant, hasEnteredFullAddress } from '../store';
import QueryResult from './QueryResult';
import ResultsContainer from './ResultsContainer';

export interface Props {
  onClickDismiss?: () => void;
}

const QueryResults: React.FC<Props> = ({ onClickDismiss }) => {
  const queryResults = useSelector(getLastResolvedQueryResults);
  const resultsDismissed = useSelector(isResultsDismissed);
  const isSignificant = useSelector(isEnteredQuerySignificant);
  const isComplete = useSelector(hasEnteredFullAddress);

  if (queryResults.length === 0 || resultsDismissed || !isSignificant || isComplete) {
    return null;
  }

  return (
    <ResultsContainer onClickDismiss={onClickDismiss}>
      <div className="QueryResults list-group list-group-flush">
        {queryResults.slice(0, MAX_SEARCH_RESULTS).map((queryResult) => (
          <QueryResult queryResultId={queryResult.id} key={queryResult.id} />
        ))}
      </div>
    </ResultsContainer>
  );
};

export default QueryResults;
