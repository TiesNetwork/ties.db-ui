import {
  CREATE_TABLESPACE,
} from './types';

export const createTablespace = (id, payload) => ({ type: CREATE_TABLESPACE, id, payload });
