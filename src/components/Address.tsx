import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useID } from '../use-id';
import { useAddressField } from '../use-address-field';
import QueryResults from './QueryResults';
import FormGroupAddressLine2 from './FormGroupAddressLine2';
import FormGroupSuburb from './FormGroupSuburb';
import FormGroupState from './FormGroupState';
import FormGroupPostcode from './FormGroupPostcode';
import { getAddressLine1, isResultsDismissed } from '../store';

import {
  decrementActiveResult,
  dismissResults,
  incrementActiveResult,
  recallResults,
  selectHighlightedAddress,
  setAddressLine1,
} from '../store/actions';

import './Address.css';

export interface Props {

}

const Address: React.FC<Props> = () => {
  const addressLine1Ref = React.useRef<HTMLInputElement>(null);
  const resultsRef = React.useRef<HTMLDivElement>(null);
  const id = useID();
  const dispatch = useDispatch();
  const [hasFocus, setHasFocus] = React.useState(false);
  const [addressLine1, handleChangeAddressLine1] = useAddressField(getAddressLine1, setAddressLine1);
  const isDismissed = useSelector(isResultsDismissed);
  const handleKeyDownAddressLine1: React.KeyboardEventHandler = (e) => {
    if (e.key === 'Tab') {
      dispatch(dismissResults());
    } else if (e.key === 'Enter') {
      e.preventDefault();
      dispatch(selectHighlightedAddress());
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (isDismissed) {
        dispatch(recallResults());
      } else {
        dispatch(decrementActiveResult());
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (isDismissed) {
        dispatch(recallResults());
      } else {
        dispatch(incrementActiveResult());
      }
    }
  };
  const handleMouseDownAddressLine1: React.MouseEventHandler = () => {
    if (hasFocus) dispatch(recallResults());
  };
  const handleFocusAddressLine1: React.FocusEventHandler = () => {
    setHasFocus(true);
  };
  const handleBlurAddressLine1: React.FocusEventHandler = () => {
    setHasFocus(false);
  };
  const handleClickDismiss = () => {
    dispatch(dismissResults());
    if (addressLine1Ref.current) addressLine1Ref.current.focus();
  };
  // Handle browser auto complete
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
  // Handle pressing Esc
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch(dismissResults());
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });
  // Handle clicking off the component
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      const resultsEl = resultsRef.current;
      const inputEl = addressLine1Ref.current;
      const targetEl = e.target;
      if (!resultsEl || !inputEl || !targetEl) return;
      const contains = resultsEl.contains(targetEl as Element) || targetEl === inputEl;
      if (!contains) dispatch(dismissResults());
    };
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  });
  // Handle window losing focus
  React.useEffect(() => {
    const handler = () => dispatch(dismissResults());
    window.addEventListener('blur', handler);
    return () => window.removeEventListener('blur', handler);
  });
  return (
    <div className="Address">
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
            onMouseDown={handleMouseDownAddressLine1}
            onFocus={handleFocusAddressLine1}
            onBlur={handleBlurAddressLine1}
          />
        </div>
        <div className="Address-suggest-results ml-2 mr-2 mt-n1" ref={resultsRef}>
          <QueryResults onClickDismiss={handleClickDismiss} />
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
