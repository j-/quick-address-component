import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useID } from '../use-id';
import { useAddressField } from '../use-address-field';
import { getState } from '../store';
import { setState, dismissResults } from '../store/actions';

const FormGroupState: React.FC = () => {
  const id = useID();
  const dispatch = useDispatch();
  const [value, handleChange] = useAddressField(getState, setState);
  const handleFocus = () => dispatch(dismissResults());
  return (
    <div className="FormGroupState form-group">
      <label htmlFor={id('FormGroupState')}>State</label><br />
      <input
        id={id('FormGroupState')}
        className="form-control"
        type="text"
        autoComplete="address-level1"
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
      />
    </div>
  );
};

export default FormGroupState;
