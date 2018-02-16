import {
  CREATE_FIELD,
} from './types';

export const createField = (id, payload) => ({ type: CREATE_FIELD, id, payload });
