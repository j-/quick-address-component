import * as React from 'react';

export interface Props {
  onClickDismiss?: () => void;
}

const ResultsContainer: React.FC<Props> = ({ onClickDismiss, children }) => {
  const handleClickDismiss: React.MouseEventHandler = (e) => {
    e.preventDefault();
    if (onClickDismiss) onClickDismiss();
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
