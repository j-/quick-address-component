import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useID } from '../use-id';
import { useAddressField } from '../use-address-field';
import { getAddressLine1, getAddressLine2, getSuburb, getState, getPostcode, getCurrentQuery, getHighlightedAddress } from '../store';
import { setAddressLine1, setAddressLine2, setSuburb, setState, setPostcode, dismissResults, setAddress, incrementActiveResult, decrementActiveResult } from '../store/actions';
import QueryStatus from './QueryStatus';
import QueryResults from './QueryResults';
import { parsePartialAddress } from '../address';

export interface Props {

}

const Address: React.FC<Props> = () => {
  const addressLine1Ref = React.useRef<HTMLInputElement>(null);
  const id = useID();
  const dispatch = useDispatch();
  const [addressLine1, handleChangeAddressLine1] = useAddressField(getAddressLine1, setAddressLine1);
  const [addressLine2, handleChangeAddressLine2] = useAddressField(getAddressLine2, setAddressLine2);
  const [suburb, handleChangeSuburb] = useAddressField(getSuburb, setSuburb);
  const [state, handleChangeState] = useAddressField(getState, setState);
  const [postcode, handleChangePostcode] = useAddressField(getPostcode, setPostcode);
  const currentQuery = useSelector(getCurrentQuery);
  const highlightedAddress = useSelector(getHighlightedAddress);
  const handleKeyDownAddressLine1: React.KeyboardEventHandler = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      dispatch(dismissResults());
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (!highlightedAddress) return;
      const address = parsePartialAddress(highlightedAddress.partial);
      if (!address) return;
      dispatch(setAddress(address));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      dispatch(decrementActiveResult());
    } else if (e.key === 'ArrowDown') {
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
  return (
    <div className="Address">
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
      {currentQuery && <QueryStatus queryId={currentQuery.id} />}
      {currentQuery && <QueryResults />}
      <div className="Address-line-2-container form-group">
        <label htmlFor={id('Address-line-2')}>Address line 2</label><br />
        <input
          id={id('Address-line-2')}
          className="form-control"
          type="text"
          autoComplete="address-line2"
          value={addressLine2}
          onChange={handleChangeAddressLine2}
        />
      </div>
      <div className="Address-suburb-container form-group">
        <label htmlFor={id('Address-suburb')}>Suburb</label><br />
        <input
          id={id('Address-suburb')}
          className="form-control"
          type="text"
          autoComplete="address-level2"
          value={suburb}
          onChange={handleChangeSuburb}
        />
      </div>
      <div className="Address-state-container form-group">
        <label htmlFor={id('Address-state')}>State</label><br />
        <input
          id={id('Address-state')}
          className="form-control"
          type="text"
          autoComplete="address-level1"
          value={state}
          onChange={handleChangeState}
        />
      </div>
      <div className="Address-postcode-container form-group">
        <label htmlFor={id('Address-postcode')}>Postcode</label><br />
        <input
          id={id('Address-postcode')}
          className="form-control"
          type="text"
          autoComplete="postal-code"
          value={postcode}
          onChange={handleChangePostcode}
        />
      </div>
    </div>
  );
};

export default Address;
