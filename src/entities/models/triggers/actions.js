import {
  CREATE_TRIGGER,
} from './types';

export const createTrigger = (id, payload) => ({ type: CREATE_TRIGGER, id, payload });
