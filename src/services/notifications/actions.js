import {
  CREATE_NOTIFICATION,
  DELETE_NOTIFICATION,
} from './types';

export const createNotification = (id, payload) => ({
  type: CREATE_NOTIFICATION, id, payload
});

export const deleteNotification = id => ({
  type: DELETE_NOTIFICATION, id
});
