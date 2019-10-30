import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useID } from '../use-id';
import { useAddressField } from '../use-address-field';
import { getPostcode } from '../store';
import { setPostcode, dismissResults } from '../store/actions';

const FormGroupPostcode: React.FC = () => {
  const id = useID();
  const dispatch = useDispatch();
  const [value, handleChange] = useAddressField(getPostcode, setPostcode);
  const handleFocus = () => dispatch(dismissResults());
  return (
    <div className="FormGroupPostcode form-group">
      <label htmlFor={id('FormGroupPostcode')}>Postcode</label><br />
      <input
        id={id('FormGroupPostcode')}
        className="form-control"
        type="text"
        autoComplete="postal-code"
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
      />
    </div>
  );
};

export default FormGroupPostcode;
