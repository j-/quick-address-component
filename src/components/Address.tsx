import * as React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { useID } from '../use-id';
import { useAddressField } from '../use-address-field';
import { useWindowListener } from '../use-window-listener';
import QueryResults from './QueryResults';
import FormGroupAddressLine2 from './FormGroupAddressLine2';
import FormGroupSuburb from './FormGroupSuburb';
import FormGroupState from './FormGroupState';
import FormGroupPostcode from './FormGroupPostcode';
import { getAddressLine1, isResultsDismissed } from '../store';
import { actionCreators, setAddressLine1 } from '../store/actions';
import './Address.css';

export interface Props {

}

const Address: React.FC<Props> = () => {
  const addressLine1Ref = React.useRef<HTMLInputElement>(null);
  const resultsRef = React.useRef<HTMLDivElement>(null);
  const id = useID();
  const dispatch = useDispatch();
  const {
    decrementActiveResult,
    dismissResults,
    incrementActiveResult,
    recallResults,
    selectHighlightedAddress,
  } = bindActionCreators(actionCreators, dispatch);
  const [hasFocus, setHasFocus] = React.useState(false);
  const [addressLine1, handleChangeAddressLine1] = useAddressField(getAddressLine1, setAddressLine1);
  const isDismissed = useSelector(isResultsDismissed);
  const handleKeyDownAddressLine1: React.KeyboardEventHandler = (e) => {
    if (e.key === 'Tab') {
      dismissResults();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      selectHighlightedAddress();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (isDismissed) {
        recallResults();
      } else {
        decrementActiveResult();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (isDismissed) {
        recallResults();
      } else {
        incrementActiveResult();
      }
    }
  };
  const handleMouseDownAddressLine1: React.MouseEventHandler = () => {
    if (hasFocus) recallResults();
  };
  const handleFocusAddressLine1: React.FocusEventHandler = () => {
    setHasFocus(true);
  };
  const handleBlurAddressLine1: React.FocusEventHandler = () => {
    setHasFocus(false);
  };
  const handleClickDismiss = () => {
    dismissResults();
    if (addressLine1Ref.current) addressLine1Ref.current.focus();
  };
  // Handle pressing Esc
  useWindowListener('keydown', (e) => {
    if (e.key === 'Escape') dismissResults();
  });
  // Handle clicking off the component
  useWindowListener('click', (e) => {
    const resultsEl = resultsRef.current;
    const inputEl = addressLine1Ref.current;
    const targetEl = e.target;
    if (!resultsEl || !inputEl || !targetEl) return;
    if (
      // Clicked inside the address line 1 field
      targetEl === inputEl ||
      // Clicked the suggestions element or its children
      resultsEl.contains(targetEl as Element)
    ) {
      dismissResults();
    }
  });
  // Handle window losing focus
  useWindowListener('blur', () => dismissResults());
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
