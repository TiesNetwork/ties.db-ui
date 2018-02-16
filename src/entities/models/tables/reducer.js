import {
  ADD_FIELD,
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
          fields: [...table.field, action.payload]
        }
      };
    default:
      return state;
  }
}
