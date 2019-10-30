import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useID } from '../use-id';
import { useAddressField } from '../use-address-field';
import { getSuburb } from '../store';
import { setSuburb, dismissResults } from '../store/actions';

const FormGroupSuburb: React.FC = () => {
  const id = useID();
  const dispatch = useDispatch();
  const [value, handleChange] = useAddressField(getSuburb, setSuburb);
  const handleFocus = () => dispatch(dismissResults());
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
        onFocus={handleFocus}
      />
    </div>
  );
};

export default FormGroupSuburb;
