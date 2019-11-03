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

/**
 * Uses the provided selector to get a value out of the store, and the given
 * action creator to put updated values back into the store. Returns a change
 * event handler for input elements.
 *
 * @example
 *
 * const [suburb, onChangeSuburb] = useAddressField(getSuburb, setSuburb);
 * const el = <input type="text" value={suburb} onChange={onChangeSuburb} />;
 */
export const useAddressField: UseAddressField = (selector, actionCreator) => {
  const dispatch = useDispatch();
  return [useSelector(selector), (e) => {
    dispatch(actionCreator(e.currentTarget.value));
  }];
};
