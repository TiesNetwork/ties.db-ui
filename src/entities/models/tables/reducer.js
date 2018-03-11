import { omit } from 'lodash';

/** Types **/
import {
  ADD_FIELD,
  ADD_INDEX,
  ADD_TRIGGER,

  CREATE_TABLE,
  DELETE_TABLE,
  UPDATE_TABLE,
} from './types';

const initialState = {};

export default (state = initialState, action) => {
  const table = state[action.hash];

  switch (action.type) {
    case ADD_FIELD:
      return {
        ...state,
        [action.hash]: {
          ...table,
          fields: [...table.fields, action.payload],
        }
      };
    case ADD_INDEX:
      return {
        ...state,
        [action.hash]: {
          ...table,
          indexes: [...table.indexes, action.payload],
        }
      };
    case ADD_TRIGGER:
      return {
        ...state,
        [action.hash]: {
          ...table,
          triggers: [...table.triggers, action.payload],
        }
      };
    case CREATE_TABLE:
      return {
        ...state,
        [action.hash]: action.payload,
      };
    case DELETE_TABLE:
      return omit(state, action.hash);
    case UPDATE_TABLE:
      return {
        ...state,
        [action.hash]: {
          ...table,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}
