import {
  CREATE_INDEX,
  DELETE_INDEX,
  UPDATE_INDEX,
} from './types';

export const createIndex = (hash, payload) => ({ type: CREATE_INDEX, hash, payload });
export const deleteIndex = hash => ({ type: DELETE_INDEX, hash });
export const updateIndex = (hash, payload) => ({ type: UPDATE_INDEX, hash, payload });
