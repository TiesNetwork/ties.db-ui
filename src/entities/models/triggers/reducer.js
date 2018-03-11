import { omit } from 'lodash';

/** Types **/
import {
  CREATE_TRIGGER,
  DELETE_TRIGGER,
  UPDATE_TRIGGER,
} from './types';

const initialState = {};

export default (state = initialState, action) => {
  const trigger = state[action.hash];

  switch (action.type) {
    case CREATE_TRIGGER:
      return {
        ...state,
        [action.hash]: action.payload,
      };
    case DELETE_TRIGGER:
      return omit(state, action.hash);
    case UPDATE_TRIGGER:
      return {
        ...state,
        [action.hash]: {
          ...trigger,
          ...action.payload,
        }
      }
    default:
      return state;
  }
}
