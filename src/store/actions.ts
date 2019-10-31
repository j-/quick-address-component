import { Action } from 'redux';
import { QueryEntity } from '../entities';
import { QASResultEntities, quickAddressSearch, getEntitiesFromQASResult, AddressSearchOptions, AddressSearchResults } from '../api';
import { ThunkAction } from 'redux-thunk';
import { RootReducerState, getHighlightedAddress, getAddressBeforeHighlighted, getAddressAfterHighlighted, isResultsDismissed } from '.';
import { parsePartialAddress } from '../parse-partial-address';

/* Address line 1 */

export const ACTION_SET_ADDRESS_LINE_1 = 'SET_ADDRESS_LINE_1';

export interface ActionSetAddressLine1 extends Action<typeof ACTION_SET_ADDRESS_LINE_1> {
  data: {
    addressLine1: string;
  };
}

export const isActionSetAddressLine1 = (action: Action): action is ActionSetAddressLine1 => (
  action.type === ACTION_SET_ADDRESS_LINE_1
);

export const setAddressLine1 = (value: string): ActionSetAddressLine1 => ({
  type: ACTION_SET_ADDRESS_LINE_1,
  data: {
    addressLine1: value,
  },
});

/* Address line 2 */

export const ACTION_SET_ADDRESS_LINE_2 = 'SET_ADDRESS_LINE_2';

export interface ActionSetAddressLine2 extends Action<typeof ACTION_SET_ADDRESS_LINE_2> {
  data: {
    addressLine2: string;
  };
}

export const isActionSetAddressLine2 = (action: Action): action is ActionSetAddressLine2 => (
  action.type === ACTION_SET_ADDRESS_LINE_2
);

export const setAddressLine2 = (value: string): ActionSetAddressLine2 => ({
  type: ACTION_SET_ADDRESS_LINE_2,
  data: {
    addressLine2: value,
  },
});

/* Suburb */

export const ACTION_SET_SUBURB = 'SET_SUBURB';

export interface ActionSetSuburb extends Action<typeof ACTION_SET_SUBURB> {
  data: {
    suburb: string;
  };
}

export const isActionSetSuburb = (action: Action): action is ActionSetSuburb => (
  action.type === ACTION_SET_SUBURB
);

export const setSuburb = (value: string): ActionSetSuburb => ({
  type: ACTION_SET_SUBURB,
  data: {
    suburb: value,
  },
});

/* State */

export const ACTION_SET_STATE = 'SET_STATE';

export interface ActionSetState extends Action<typeof ACTION_SET_STATE> {
  data: {
    state: string;
  };
}

export const isActionSetState = (action: Action): action is ActionSetState => (
  action.type === ACTION_SET_STATE
);

export const setState = (value: string): ActionSetState => ({
  type: ACTION_SET_STATE,
  data: {
    state: value,
  },
});

/* Postcode */

export const ACTION_SET_POSTCODE = 'SET_POSTCODE';

export interface ActionSetPostcode extends Action<typeof ACTION_SET_POSTCODE> {
  data: {
    postcode: string;
  };
}

export const isActionSetPostcode = (action: Action): action is ActionSetPostcode => (
  action.type === ACTION_SET_POSTCODE
);

export const setPostcode = (value: string): ActionSetPostcode => ({
  type: ACTION_SET_POSTCODE,
  data: {
    postcode: value,
  },
});

/* Set address */

export const ACTION_SET_ADDRESS = 'SET_ADDRESS';

export interface ActionSetAddress extends Action<typeof ACTION_SET_ADDRESS> {
  data: {
    addressLine1: string;
    addressLine2: string;
    suburb: string;
    state: string;
    postcode: string;
  };
}

export const isActionSetAddress = (action: Action): action is ActionSetAddress => (
  action.type === ACTION_SET_ADDRESS
);

export const setAddress = ({
  addressLine1,
  addressLine2,
  suburb,
  state,
  postcode,
}: {
  addressLine1: string;
  addressLine2: string;
  suburb: string;
  state: string;
  postcode: string;
}): ActionSetAddress => ({
  type: ACTION_SET_ADDRESS,
  data: {
    addressLine1,
    addressLine2,
    suburb,
    state,
    postcode,
  },
});

/* Query */

export const ACTION_QUERY_START = 'QUERY_START';

export interface ActionQueryStart extends Action<typeof ACTION_QUERY_START> {
  data: {
    query: QueryEntity;
  };
}

export const isActionQueryStart = (action: Action): action is ActionQueryStart => (
  action.type === ACTION_QUERY_START
);

export const query = (entity: QueryEntity, options?: AddressSearchOptions): ThunkAction<void, RootReducerState, void, ActionQueryStart | ActionQuerySuccess | ActionQueryError> => async (dispatch) => {
  dispatch<ActionQueryStart>({
    type: ACTION_QUERY_START,
    data: {
      query: entity,
    },
  });
  let qasResult: AddressSearchResults;
  let entities: QASResultEntities;
  // Try and make a request to the QAS endpoint
  try {
    qasResult = await quickAddressSearch(entity.term, options);
  } catch (err) {
    dispatch<ActionQueryError>({
      type: ACTION_QUERY_ERROR,
      data: {
        query: entity,
        error: 'There was a problem contacting the address server',
      },
    });
    return;
  }
  // Parse the response from the QAS endpoint
  try {
    entities = getEntitiesFromQASResult(entity.id, qasResult);
  } catch (err) {
    dispatch<ActionQueryError>({
      type: ACTION_QUERY_ERROR,
      data: {
        query: entity,
        error: 'There was a problem fetching address suggestions',
      },
    });
    return;
  }
  dispatch<ActionQuerySuccess>({
    type: ACTION_QUERY_SUCCESS,
    data: {
      query: entity,
      entities,
    },
  });
};

/* Query error */

export const ACTION_QUERY_ERROR = 'QUERY_ERROR';

export interface ActionQueryError extends Action<typeof ACTION_QUERY_ERROR> {
  data: {
    query: QueryEntity;
    error: string;
  };
}

export const isActionQueryError = (action: Action): action is ActionQueryError => (
  action.type === ACTION_QUERY_ERROR
);

/* Query success */

export const ACTION_QUERY_SUCCESS = 'QUERY_SUCCESS';

export interface ActionQuerySuccess extends Action<typeof ACTION_QUERY_SUCCESS> {
  data: {
    query: QueryEntity;
    entities: QASResultEntities;
  };
}

export const isActionQuerySuccess = (action: Action): action is ActionQuerySuccess => (
  action.type === ACTION_QUERY_SUCCESS
);

/* Dismiss results */

export const ACTION_DISMISS_RESULTS = 'DISMISS_RESULTS';

export interface ActionDismissResults extends Action<typeof ACTION_DISMISS_RESULTS> {}

export const isActionDismissResults = (action: Action): action is ActionDismissResults => (
  action.type === ACTION_DISMISS_RESULTS
);

export const dismissResults = (): ThunkAction<void, RootReducerState, void, ActionDismissResults> => (dispatch, getState) => {
  if (isResultsDismissed(getState())) return;
  dispatch({ type: ACTION_DISMISS_RESULTS });
};

/* Recall results */

export const ACTION_RECALL_RESULTS = 'RECALL_RESULTS';

export interface ActionRecallResults extends Action<typeof ACTION_RECALL_RESULTS> {}

export const isActionRecallResults = (action: Action): action is ActionRecallResults => (
  action.type === ACTION_RECALL_RESULTS
);

export const recallResults = (): ThunkAction<void, RootReducerState, void, ActionRecallResults> => (dispatch, getState) => {
  if (!isResultsDismissed(getState())) return;
  dispatch({ type: ACTION_RECALL_RESULTS });
};

/* Set active query result */

export const ACTION_SET_ACTIVE_ADDRESS_ID = 'SET_ACTIVE_ADDRESS_ID';

export interface ActionSetActiveAddressId extends Action<typeof ACTION_SET_ACTIVE_ADDRESS_ID> {
  data: {
    id: string;
  };
}

export const isActionSetActiveAddressId = (action: Action): action is ActionSetActiveAddressId => (
  action.type === ACTION_SET_ACTIVE_ADDRESS_ID
);

export const setActiveAddressId = (id: string): ActionSetActiveAddressId => ({
  type: ACTION_SET_ACTIVE_ADDRESS_ID,
  data: {
    id,
  },
});

export const incrementActiveResult = (): ThunkAction<void, RootReducerState, void, ActionSetActiveAddressId> => (dispatch, getState) => {
  const state = getState();
  const address = getAddressAfterHighlighted(state);
  if (!address) return;
  dispatch(setActiveAddressId(address.id));
};

export const decrementActiveResult = (): ThunkAction<void, RootReducerState, void, ActionSetActiveAddressId> => (dispatch, getState) => {
  const state = getState();
  const address = getAddressBeforeHighlighted(state);
  if (!address) return;
  dispatch(setActiveAddressId(address.id));
};

/* Select highlighted address */

export const selectHighlightedAddress = (): ThunkAction<void, RootReducerState, void, ActionSetAddress> => (dispatch, getState) => {
  const state = getState();
  const highlightedAddress = getHighlightedAddress(state);
  if (!highlightedAddress) return;
  const address = parsePartialAddress(highlightedAddress.partial);
  if (!address) return;
  dispatch(setAddress(address));
};

/* Action creators */

export const actionCreators = {
  setAddressLine1,
  setAddressLine2,
  setSuburb,
  setState,
  setPostcode,
  setAddress,
  query,
  dismissResults,
  recallResults,
  setActiveAddressId,
  incrementActiveResult,
  decrementActiveResult,
  selectHighlightedAddress,
};
