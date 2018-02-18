import {
  CREATE_TRIGGER,
} from './types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TRIGGER:
      return {
        ...state,
        [action.id]: action.payload,
      };
    default:
      return state;
  }
}
