import {
  ADD_TABLE,
  CREATE_TABLESPACE,
  UPDATE_TABLESPACE,
} from './types';

export default (state = {}, action) => {
  const tablespace = state[action.hash];

  switch (action.type) {
    case ADD_TABLE:
      return {
        ...state,
        [action.hash]: {
          ...tablespace,
          tables: [...tablespace.tables, action.payload],
        },
      };
    case CREATE_TABLESPACE:
      return {
        ...state,
        [action.hash]: action.payload,
      };
    case UPDATE_TABLESPACE:
      return {
        ...state,
        [action.hash]: {
          ...tablespace,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}
