import {
  CREATE_INDEX,
} from './types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_INDEX:
      return {
        ...state,
        [action.id]: action.payload,
      };
    default:
      return state;
  }
}
