import {
  ADD_TABLE,
  CREATE_TABLESPACE,
} from './types';

const initialState = {};

export default (state = initialState, action) => {
  const tablespace = state[action.id];

  switch (action.type) {
    case ADD_TABLE:
      return {
        ...state,
        [action.id]: {
          ...tablespace,
          tables: [...tablespace.tables, action.payload],
        },
      };
    case CREATE_TABLESPACE:
      return {
        ...state,
        [action.id]: action.payload,
      };
    default:
      return state;
  }
}
