import { remove } from 'lodash';

/** Types **/
import {
  CREATE_TABLESPACE,
  DELETE_TABLESPACE,
  UPDATE_TABLESPACES,
} from './types';

const initialState = {
  tablespaces: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TABLESPACE:
      return {
        ...state,
        tablespaces: [...state.tablespaces, action.hash],
      };
    case DELETE_TABLESPACE:
      return {
        ...state,
        tablespaces: remove(state.tablespaces, n => n !== action.hash),
      };
    case UPDATE_TABLESPACES:
      return {
        ...state,
        tablespaces: [...state.tablespaces, ...action.payload],
      };
    default:
      return state;
  }
}
