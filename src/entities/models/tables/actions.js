import {
  ADD_FIELD,
} from './types';

export const addField = (id, payload) => ({ type: ADD_FIELD, id, payload });
