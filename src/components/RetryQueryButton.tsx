import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducerState, getQueryById } from '../store';
import { query } from '../store/actions';
import { QueryEntity } from '../entities';

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  queryId: string;
}

const RetryQueryButton: React.FC<Props> = ({ queryId, ...props }) => {
  const dispatch = useDispatch();
  const queryEntity = useSelector<RootReducerState, QueryEntity | null>((state) => getQueryById(state, queryId));
  const handleClick: React.MouseEventHandler = (e) => {
    e.preventDefault();
    if (queryEntity) dispatch(query(queryEntity));
  };
  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={handleClick}
      {...props}
    >
      Retry
    </button>
  );
};

export default RetryQueryButton;
