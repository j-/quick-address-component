import { Reducer } from 'redux';
import { EntityMap, AddressEntity } from '../entities';
import { isActionQuerySuccess } from './actions';

export type ReducerState = EntityMap<AddressEntity>

const DEFAULT_STATE: ReducerState = {};

const reducer: Reducer<ReducerState> = (state = DEFAULT_STATE, action) => {
  if (isActionQuerySuccess(action)) {
    const { entities } = action.data;
    return {
      ...state,
      ...entities.addresses,
    };
  }

  return state;
};

export default reducer;

export const getAddressById = (state: ReducerState, addressId: string): AddressEntity => (
  state[addressId] || null
);
