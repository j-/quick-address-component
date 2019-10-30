import * as React from 'react';
import { useID } from '../use-id';
import { useAddressField } from '../use-address-field';
import { getState } from '../store';
import { setState } from '../store/actions';

const FormGroupState: React.FC = () => {
  const id = useID();
  const [value, handleChange] = useAddressField(getState, setState);
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
      />
    </div>
  );
};

export default FormGroupState;
