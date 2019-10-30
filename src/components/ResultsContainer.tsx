import * as React from 'react';
import { useDispatch } from 'react-redux';
import { dismissResults } from '../store/actions';

const ResultsContainer: React.FC = ({ children }) => {
  const dispatch = useDispatch();

  const handleClickDismiss: React.MouseEventHandler = (e) => {
    e.preventDefault();
    dispatch(dismissResults());
  };

  return (
    <div className="ResultsContainer card border-primary">
      {children}
      <div className="ResultsContainer-actions card-footer p-1">
        <button
          type="button"
          onClick={handleClickDismiss}
          className="btn btn-light btn-sm text-left"
        >
          Dismiss suggestions <small>(Esc)</small>
        </button>
      </div>
    </div>
  );
};

export default ResultsContainer;
