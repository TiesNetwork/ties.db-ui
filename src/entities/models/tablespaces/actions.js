import {
  CREATE_TABLE,
  DELETE_TABLE,

  CREATE_TABLESPACE,
  DELETE_TABLESPACE,
  UPDATE_TABLESPACE,
} from './types';

export const createTable = (hash, payload) => ({ type: CREATE_TABLE, hash, payload });
export const deleteTable = (hash, payload) => ({ type: DELETE_TABLE, hash, payload });

export const createTablespace = (hash, payload) => ({ type: CREATE_TABLESPACE, hash, payload });
export const deleteTablespace = hash => ({ type: DELETE_TABLESPACE, hash });
export const updateTablespace = (hash, payload) => ({ type: UPDATE_TABLESPACE, hash, payload });
