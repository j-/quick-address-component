import * as React from 'react';
import { useID } from '../use-id';
import { useAddressField } from '../use-address-field';
import { getAddressLine2 } from '../store';
import { setAddressLine2 } from '../store/actions';

const FormGroupAddressLine2: React.FC = () => {
  const id = useID();
  const [value, handleChange] = useAddressField(getAddressLine2, setAddressLine2);
  return (
    <div className="FormGroupAddressLine2 form-group">
      <label htmlFor={id('FormGroupAddressLine2')}>Address line 2 (optional)</label><br />
      <input
        id={id('FormGroupAddressLine2')}
        className="form-control"
        type="text"
        autoComplete="address-line2"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default FormGroupAddressLine2;
