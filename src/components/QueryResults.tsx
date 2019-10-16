import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentQueryResults, isResultsDismissed } from '../store';
import { dismissResults } from '../store/actions';
import QueryResult from './QueryResult';

export interface Props {

}

const QueryResults: React.FC = () => {
  const queryResults = useSelector(getCurrentQueryResults);
  const resultsDismissed = useSelector(isResultsDismissed);
  const dispatch = useDispatch();

  if (queryResults.length === 0 || resultsDismissed) {
    return null;
  }

  const handleClickDismiss: React.MouseEventHandler = (e) => {
    e.preventDefault();
    dispatch(dismissResults());
  };
  
  return (
    <div className="QueryResults mt-3 mt-3">
      <div className="QueryResults-results list-group">
        {queryResults.map((queryResult) => (
          <QueryResult queryResultId={queryResult.id} key={queryResult.id} />
        ))}
      </div>
      <button
        type="button"
        onClick={handleClickDismiss}
        className="btn btn-light text-left"
      >
        Dismiss suggestions
      </button>
    </div>
  );
};

export default QueryResults;
