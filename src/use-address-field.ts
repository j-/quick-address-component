import * as React from 'react';
import { Action } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { RootReducerState } from './store';

export type AddressFieldSelector = (state: RootReducerState) => string;
export type AddressFieldActionCreator = (value: string) => Action;
export type AddressFieldChangeHandler = React.ChangeEventHandler<HTMLInputElement>;

export interface UseAddressField {
  (selector: AddressFieldSelector, actionCreator: AddressFieldActionCreator): [string, AddressFieldChangeHandler]
}

export const useAddressField: UseAddressField = (selector, actionCreator) => {
  const dispatch = useDispatch();
  return [useSelector(selector), (e) => {
    dispatch(actionCreator(e.currentTarget.value));
  }];
};
