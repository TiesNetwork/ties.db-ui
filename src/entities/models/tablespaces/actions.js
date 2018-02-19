import {
  ADD_TABLE,
  CREATE_TABLESPACE,
} from './types';

export const addTable = (id, payload) => ({ type: ADD_TABLE, id, payload });
export const createTablespace = (id, payload) => ({ type: CREATE_TABLESPACE, id, payload });
