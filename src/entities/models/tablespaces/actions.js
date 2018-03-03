import {
  UPDATE_TABLESPACE,
} from './types';

export const updateTablespace = (hash, payload) => ({ type: UPDATE_TABLESPACE, hash, payload });
