import * as React from 'react';
import { useID } from '../use-id';
import { useAddressField } from '../use-address-field';
import { getPostcode } from '../store';
import { setPostcode } from '../store/actions';

const FormGroupPostcode: React.FC = () => {
  const id = useID();
  const [value, handleChange] = useAddressField(getPostcode, setPostcode);
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
      />
    </div>
  );
};

export default FormGroupPostcode;
