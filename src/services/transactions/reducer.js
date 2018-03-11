import { omit } from 'lodash';

import {
  CREATE_TRANSACTION,
  DELETE_TRANSACTION,
  UPDATE_TRANSACTION,
} from './types';

export default (state = {}, action) => {
  const transaction = state[action.hash];

  switch (action.type) {
    case CREATE_TRANSACTION:
      return {
        ...state,
        [action.hash]: action.payload,
      };
    case DELETE_TRANSACTION:
      return omit(state, action.hash);
    case UPDATE_TRANSACTION:
      return {
        ...state,
        [action.hash]: {
          ...transaction,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}
