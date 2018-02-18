import {
  CREATE_INDEX,
} from './types';

export const createIndex = (id, payload) => ({ type: CREATE_INDEX, id, payload });
