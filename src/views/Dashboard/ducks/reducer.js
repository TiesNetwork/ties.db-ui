/** Types **/
import {
  CREATE_TABLESPACE,
} from './types';

const initialState = {
  tablespaces: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TABLESPACE:
      return {
        ...state,
        tablespaces: [...state.tablespaces, action.id],
      };
    default:
      return state;
  }
}
