import {
  ADD_FIELD,
  ADD_INDEX,
  ADD_TRIGGER,

  CREATE_TABLE,
} from './types';

export const addField = (id, payload) => ({ type: ADD_FIELD, id, payload });
export const addIndex = (id, payload) => ({ type: ADD_INDEX, id, payload });
export const addTrigger = (id, payload) => ({ type: ADD_TRIGGER, id, payload });

export const createTable = (id, payload) => ({ type: CREATE_TABLE, id, payload });

