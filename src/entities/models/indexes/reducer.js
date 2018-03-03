import {
  CREATE_INDEX,
  UPDATE_INDEX,
} from './types';

const initialState = {};

export default (state = initialState, action) => {
  const index = state[action.hash];

  switch (action.type) {
    case CREATE_INDEX:
      return {
        ...state,
        [action.hash]: action.payload,
      };
    case UPDATE_INDEX:
      return {
        ...state,
        [action.hash]: {
          ...index,
          ...action.payload,
        }
      }
    default:
      return state;
  }
}
