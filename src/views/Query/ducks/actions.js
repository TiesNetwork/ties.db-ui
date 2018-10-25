import {
  SET_COLUMNS,
  SET_CONNECTION,
  SET_CONNECTED,
  SET_DATA,
  SET_ERROR,
  SET_LOADED,
} from './types';

export const setColumns = columns => ({ type: SET_COLUMNS, columns });
export const setConnection = connection => ({ type: SET_CONNECTION, connection });
export const setConnected = isConnected => ({ type: SET_CONNECTED, isConnected });
export const setData = data => ({ type: SET_DATA, data });
export const setError = error => ({ type: SET_ERROR, error });
export const setLoaded = isLoaded => ({ type: SET_LOADED, isLoaded });

