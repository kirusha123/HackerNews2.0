import { setLastUpdateTimestampAction } from '../actions/lastUpdateTimestampActions';
import initialState from '../initialState';
import { StoreI, ActionI } from '../interfaces/default';

export default (state: StoreI = initialState, action: ActionI) => {
  switch (action.type) {
    case setLastUpdateTimestampAction:
      return (state = { ...state, lastUpdateTimestamp: action.payload });

    default:
      return state;
  }
};
