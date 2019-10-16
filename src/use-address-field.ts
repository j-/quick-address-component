import { useSelector, useDispatch } from 'react-redux';
import { AddressFieldSelector, AddressFieldActionCreator, AddressFieldChangeHandler } from './types';

export interface UseAddressField {
  (selector: AddressFieldSelector, actionCreator: AddressFieldActionCreator): [string, AddressFieldChangeHandler]
}

export const useAddressField: UseAddressField = (selector, actionCreator) => {
  const dispatch = useDispatch();
  return [useSelector(selector), (e) => {
    dispatch(actionCreator(e.currentTarget.value));
  }];
};
