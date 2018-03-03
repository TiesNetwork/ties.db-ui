import {
  UPDATE_TABLESPACE,
} from './types';

export default (state = {}, action) => {
  const tablespace = state[action.hash];

  switch (action.type) {
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
