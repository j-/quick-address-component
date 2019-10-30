import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useID } from '../use-id';
import { useAddressField } from '../use-address-field';
import { getAddressLine2 } from '../store';
import { setAddressLine2, dismissResults } from '../store/actions';

const FormGroupAddressLine2: React.FC = () => {
  const id = useID();
  const dispatch = useDispatch();
  const [value, handleChange] = useAddressField(getAddressLine2, setAddressLine2);
  const handleFocus = () => dispatch(dismissResults());
  return (
    <div className="FormGroupAddressLine2 form-group">
      <label htmlFor={id('FormGroupAddressLine2')}>Address line 2</label><br />
      <input
        id={id('FormGroupAddressLine2')}
        className="form-control"
        type="text"
        autoComplete="address-line2"
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
      />
    </div>
  );
};

export default FormGroupAddressLine2;
