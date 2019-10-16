import * as React from 'react';
import classNames from 'classnames';

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  addressId: string;
  isHighlighted?: boolean;
}

const AddressSuggestion: React.FC<Props> = ({ addressId, isHighlighted, ...props }) => (
  <button
    className={classNames('AddressSuggestion list-group-item list-group-item-action', isHighlighted && 'active')}
    type="button"
    {...props}
  />
);

export default AddressSuggestion;
