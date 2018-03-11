import {
  CREATE_FIELD,
  DELETE_FIELD,
  UPDATE_FIELD,
} from './types';

export const createField = (hash, payload) => ({ type: CREATE_FIELD, hash, payload });
export const deleteField = (hash) => ({ type: DELETE_FIELD, hash });
export const updateField = (hash, payload) => ({ type: UPDATE_FIELD, hash, payload });
