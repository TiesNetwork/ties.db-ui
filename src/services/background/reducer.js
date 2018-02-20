import { omit } from 'lodash';

import {
  CREATE_DOWNLOAD,
  DELETE_DOWNLOAD,
} from './types';

export default (state = {}, action) => {
  switch (action.type) {
    case DELETE_DOWNLOAD:
      return omit(state, action.id);
    case CREATE_DOWNLOAD:
      return {
        ...state,
        [action.id]: action.props || true
      };
    default:
      return state;
  }
}
