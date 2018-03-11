import {
  ADD_TABLE,
  CREATE_TABLESPACE,
  DELETE_TABLESPACE,
  UPDATE_TABLESPACE,
} from './types';

export const addTable = (hash, payload) => ({ type: ADD_TABLE, hash, payload });
export const createTablespace = (hash, payload) => ({ type: CREATE_TABLESPACE, hash, payload });
export const deleteTablespace = hash => ({ type: DELETE_TABLESPACE, hash });
export const updateTablespace = (hash, payload) => ({ type: UPDATE_TABLESPACE, hash, payload });
