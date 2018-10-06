import { omit } from 'lodash';

import {
  CREATE_NOTIFICATION,
  DELETE_NOTIFICATION,
} from './types';

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_NOTIFICATION:
      return {
        ...state,
        [action.id]: {
          ...action.payload,
          id: action.id,
        }
      };
    case DELETE_NOTIFICATION:
      return omit(state, action.id);
    default:
      return state;
  }
}
