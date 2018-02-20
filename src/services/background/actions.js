import {
  CREATE_DOWNLOAD,
  DELETE_DOWNLOAD,
} from './types';

export const createDownload = id => ({ type: CREATE_DOWNLOAD, id });
export const deleteDownload = id => ({ type: DELETE_DOWNLOAD, id });
