import {
  ADD_FIELD,
  ADD_INDEX,
  ADD_TRIGGER,

  CREATE_TABLE,
  UPDATE_TABLE,
} from './types';

export const addField = (hash, payload) => ({ type: ADD_FIELD, hash, payload });
export const addIndex = (hash, payload) => ({ type: ADD_INDEX, hash, payload });
export const addTrigger = (hash, payload) => ({ type: ADD_TRIGGER, hash, payload });

export const createTable = (hash, payload) => ({ type: CREATE_TABLE, hash, payload });
export const updateTable = (hash, payload) => ({ type: UPDATE_TABLE, hash, payload });

