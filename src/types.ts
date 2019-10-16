import * as React from 'react';
import { Action } from 'redux';
import { RootReducerState } from './store';

export type AddressFieldSelector = (state: RootReducerState) => string;
export type AddressFieldActionCreator = (value: string) => Action;
export type AddressFieldChangeHandler = React.ChangeEventHandler<HTMLInputElement>;
