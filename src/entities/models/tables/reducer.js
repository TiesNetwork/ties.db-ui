import {
  ADD_FIELD,
  ADD_INDEX,
  ADD_TRIGGER,
} from './types';

const initialState = {};

export default (state = initialState, action) => {
  const table = state[action.id];

  switch (action.type) {
    case ADD_FIELD:
      return {
        ...state,
        [action.id]: {
          ...table,
          fields: [...table.fields, action.payload],
        }
      };
    case ADD_INDEX:
      return {
        ...state,
        [action.id]: {
          ...table,
          indexes: [...table.indexes, action.payload],
        }
      };
    case ADD_TRIGGER:
      return {
        ...state,
        [action.id]: {
          ...table,
          triggers: [...table.triggers, action.payload],
        }
      };
    default:
      return state;
  }
}
