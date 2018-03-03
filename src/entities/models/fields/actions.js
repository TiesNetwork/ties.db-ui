import {
  CREATE_FIELD,
  UPDATE_FIELD,
} from './types';

export const createField = (hash, payload) => ({ type: CREATE_FIELD, hash, payload });
export const updateField = (hash, payload) => ({ type: UPDATE_FIELD, hash, payload });
