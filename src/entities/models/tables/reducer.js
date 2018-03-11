import { omit, remove } from 'lodash';

/** Types **/
import {
  CREATE_FIELD,
  DELETE_FIELD,

  CREATE_INDEX,
  DELETE_INDEX,

  CREATE_TRIGGER,
  DELETE_TRIGGER,

  CREATE_TABLE,
  DELETE_TABLE,
  UPDATE_TABLE,
} from './types';

const initialState = {};

export default (state = initialState, action) => {
  const table = state[action.hash];

  switch (action.type) {
    case CREATE_FIELD:
      return {
        ...state,
        [action.hash]: {
          ...table,
          fields: [...table.fields, action.payload],
        }
      };
    case DELETE_FIELD:
      return {
        ...state,
        [action.hash]: {
          ...table,
          fields: remove(table.fields, n => n !== action.payload)
        }
      };

    case CREATE_INDEX:
      return {
        ...state,
        [action.hash]: {
          ...table,
          indexes: [...table.indexes, action.payload],
        }
      };
    case DELETE_INDEX:
      return {
        ...state,
        [action.hash]: {
          ...table,
          indexes: remove(table.indexes, n => n !== action.payload)
        }
      };

    case CREATE_TRIGGER:
      return {
        ...state,
        [action.hash]: {
          ...table,
          triggers: [...table.triggers, action.payload],
        }
      };
    case DELETE_TRIGGER:
      return {
        ...state,
        [action.hash]: {
          ...table,
          triggers: remove(table.triggers, n => n !== action.payload)
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
