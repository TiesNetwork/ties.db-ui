import {
  CREATE_TABLESPACE,
} from './types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TABLESPACE:
      return {
        ...state,
        [action.id]: action.payload,
      };
    default:
      return state;
  }
}
