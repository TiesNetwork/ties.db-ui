/** Types **/
import {
  UPDATE_TABLESPACES,
} from './types';

const initialState = {
  tablespaces: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TABLESPACES:
      return {
        ...state,
        tablespaces: [...state.tablespaces, ...action.payload],
      };
    default:
      return state;
  }
}
