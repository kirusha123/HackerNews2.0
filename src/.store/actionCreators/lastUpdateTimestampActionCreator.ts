import { setLastUpdateTimestampAction } from '../actions/lastUpdateTimestampActions';
import { ActionI } from '../interfaces/default';

export const createSetLastUpdateTimestampAction = (value: string) => {
  return <ActionI>{
    type: setLastUpdateTimestampAction,
    payload: value,
  };
};
