import { omit } from 'lodash';

/** Types **/
import {
  CREATE_FIELD,
  DELETE_FIELD,
  UPDATE_FIELD,
} from './types';

const initialState = {};

export default (state = initialState, action) => {
  const field = state[action.hash];

  switch (action.type) {
    case CREATE_FIELD:
      return {
        ...state,
        [action.hash]: action.payload,
      };
    case DELETE_FIELD:
      return omit(state, action.hash);
    case UPDATE_FIELD:
      return {
        ...state,
        [action.hash]: {
          ...field,
          ...action.payload,
        }
      }
    default:
      return state;
  }
}
