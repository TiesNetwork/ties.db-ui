import {
  CREATE_FIELD,
} from './types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FIELD:
      return {
        ...state,
        [action.id]: action.payload,
      };
    default:
      return state;
  }
}
