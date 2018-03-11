import {
  CREATE_FIELD,
  DELETE_FIELD,

  CREATE_INDEX,
  DELETE_INDEX,

  CREATE_TRIGGER,
  DELETE_TRIGGER,

  CREATE_TABLE,
  DELETE_TABLE,
  UPDATE_TABLE,
} from './types';

export const createField = (hash, payload) => ({ type: CREATE_FIELD, hash, payload });
export const deleteField = (hash, payload) => ({ type: DELETE_FIELD, hash, payload });

export const createIndex = (hash, payload) => ({ type: CREATE_INDEX, hash, payload });
export const deleteIndex = (hash, payload) => ({ type: DELETE_INDEX, hash, payload });

export const createTrigger = (hash, payload) => ({ type: CREATE_TRIGGER, hash, payload });
export const deleteTrigger = (hash, payload) => ({ type: DELETE_TRIGGER, hash, payload });

export const createTable = (hash, payload) => ({ type: CREATE_TABLE, hash, payload });
export const deleteTable = hash => ({ type: DELETE_TABLE, hash });
export const updateTable = (hash, payload) => ({ type: UPDATE_TABLE, hash, payload });

