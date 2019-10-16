import { Reducer } from 'redux';
import { isActionSetAddressLine1, isActionSetAddressLine2, isActionSetSuburb, isActionSetState, isActionSetPostcode, isActionQueryStart, isActionSetAddress, isActionSetActiveAddressId } from './actions';

export interface ReducerState {
  addressLine1: string;
  addressLine2: string;
  suburb: string;
  state: string;
  postcode: string;
  queryId: string | null;
  activeAddressId: string | null;
}

const DEFAULT_STATE: ReducerState = {
  addressLine1: '',
  addressLine2: '',
  suburb: '',
  state: '',
  postcode: '',
  queryId: null,
  activeAddressId: null,
}

const reducer: Reducer<ReducerState> = (state = DEFAULT_STATE, action) => {
  if (isActionSetAddressLine1(action)) {
    return {
      ...state,
      addressLine1: action.data.addressLine1,
    };
  }

  if (isActionSetAddressLine2(action)) {
    return {
      ...state,
      addressLine2: action.data.addressLine2,
    };
  }

  if (isActionSetSuburb(action)) {
    return {
      ...state,
      suburb: action.data.suburb,
    };
  }

  if (isActionSetState(action)) {
    return {
      ...state,
      state: action.data.state,
    };
  }

  if (isActionSetPostcode(action)) {
    return {
      ...state,
      postcode: action.data.postcode,
    };
  }

  if (isActionQueryStart(action)) {
    return {
      ...state,
      queryId: action.data.query.id,
    };
  }

  if (isActionSetAddress(action)) {
    return {
      ...state,
      addressLine1: action.data.addressLine1,
      addressLine2: action.data.addressLine2,
      suburb: action.data.suburb,
      state: action.data.state,
      postcode: action.data.postcode,
    };
  }

  if (isActionSetActiveAddressId(action)) {
    return {
      ...state,
      activeAddressId: action.data.id,
    };
  }

  return state;
};

export default reducer;

export const getAddressLine1 = (state: ReducerState) => state.addressLine1;
export const getAddressLine2 = (state: ReducerState) => state.addressLine2;
export const getSuburb = (state: ReducerState) => state.suburb;
export const getState = (state: ReducerState) => state.state;
export const getPostcode = (state: ReducerState) => state.postcode;
export const getCurrentQueryId = (state: ReducerState) => state.queryId;
export const getActiveAddressId = (state: ReducerState) => state.activeAddressId;
