import {
  CREATE_TRIGGER,
  UPDATE_TRIGGER,
} from './types';

export const createTrigger = (hash, payload) => ({ type: CREATE_TRIGGER, hash, payload });
export const updateTrigger = (hash, payload) => ({ type: UPDATE_TRIGGER, hash, payload });
