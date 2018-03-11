import {
  CREATE_TRIGGER,
  DELETE_TRIGGER,
  UPDATE_TRIGGER,
} from './types';

export const createTrigger = (hash, payload) => ({ type: CREATE_TRIGGER, hash, payload });
export const deleteTrigger = hash => ({ type: DELETE_TRIGGER, hash });
export const updateTrigger = (hash, payload) => ({ type: UPDATE_TRIGGER, hash, payload });
