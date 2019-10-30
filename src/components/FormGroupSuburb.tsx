import * as React from 'react';
import { useID } from '../use-id';
import { useAddressField } from '../use-address-field';
import { getSuburb } from '../store';
import { setSuburb } from '../store/actions';

const FormGroupSuburb: React.FC = () => {
  const id = useID();
  const [value, handleChange] = useAddressField(getSuburb, setSuburb);
  return (
    <div className="FormGroupSuburb form-group">
      <label htmlFor={id('FormGroupSuburb')}>Suburb</label><br />
      <input
        id={id('FormGroupSuburb')}
        className="form-control"
        type="text"
        autoComplete="address-level2"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default FormGroupSuburb;
