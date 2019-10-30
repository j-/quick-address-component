import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useID } from '../use-id';
import { useAddressField } from '../use-address-field';
import QueryResults from './QueryResults';
import FormGroupAddressLine2 from './FormGroupAddressLine2';
import FormGroupSuburb from './FormGroupSuburb';
import FormGroupState from './FormGroupState';
import FormGroupPostcode from './FormGroupPostcode';

import {
  getAddressLine1,
  getCurrentQuery,
  hasAddressAfterHighlighted,
  hasAddressBeforeHighlighted,
} from '../store';

import {
  decrementActiveResult,
  dismissResults,
  incrementActiveResult,
  selectHighlightedAddress,
  setAddressLine1,
} from '../store/actions';

import './Address.css';

export interface Props {

}

const Address: React.FC<Props> = () => {
  const addressLine1Ref = React.useRef<HTMLInputElement>(null);
  const id = useID();
  const dispatch = useDispatch();
  const [addressLine1, handleChangeAddressLine1] = useAddressField(getAddressLine1, setAddressLine1);
  const currentQuery = useSelector(getCurrentQuery);
  const hasAddressBefore = useSelector(hasAddressBeforeHighlighted);
  const hasAddressAfter = useSelector(hasAddressAfterHighlighted);
  const handleKeyDownAddressLine1: React.KeyboardEventHandler = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      dispatch(dismissResults());
    } else if (e.key === 'Tab') {
      dispatch(dismissResults());
    } else if (e.key === 'Enter') {
      e.preventDefault();
      dispatch(selectHighlightedAddress());
    } else if (e.key === 'ArrowUp' && hasAddressBefore) {
      e.preventDefault();
      dispatch(decrementActiveResult());
    } else if (e.key === 'ArrowDown' && hasAddressAfter) {
      e.preventDefault();
      dispatch(incrementActiveResult());
    }
  };
  React.useEffect(() => {
    const el = addressLine1Ref.current;
    if (!el) return;
    let autoFill = false;
    const handler = (e: AnimationEvent) => {
      const start = e.animationName === 'onAutoFillStart';
      if (autoFill !== start) {
        autoFill = start;
        console.log('Auto fill?', autoFill);
      }
    };
    el.addEventListener('animationstart', handler);
    return () => el.removeEventListener('animationstart', handler);
  });
  const handleBlur = () => {
    dispatch(dismissResults());
  };
  return (
    <div className="Address" onBlur={handleBlur}>
      <div className="Address-suggest-container">
        <div className="Address-line-1-container form-group">
          <label htmlFor={id('Address-line-1')}>Address line 1</label><br />
          <input
            id={id('Address-line-1')}
            ref={addressLine1Ref}
            className="form-control"
            type="text"
            autoComplete="address-line1"
            value={addressLine1}
            onChange={handleChangeAddressLine1}
            onKeyDown={handleKeyDownAddressLine1}
          />
        </div>
        <div className="Address-suggest-results ml-2 mr-2 mt-n1">
          <QueryResults />
        </div>
      </div>
      <FormGroupAddressLine2 />
      <FormGroupSuburb />
      <FormGroupState />
      <FormGroupPostcode />
    </div>
  );
};

export default Address;
