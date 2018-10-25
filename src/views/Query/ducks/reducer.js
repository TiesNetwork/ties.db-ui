import {
  SET_COLUMNS,
  SET_CONNECTION,
  SET_CONNECTED,
  SET_DATA,
  SET_ERROR,
  SET_LOADED,
} from './types';

const initialState = {
  columns: [],
  connection: null,
  data: [],
  error: false,
  isConnected: false,
  isLoaded: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COLUMNS:
      return { ...state, columns: action.columns };
    case SET_CONNECTION:
      return { ...state, connection: action.connection };
    case SET_CONNECTED:
      return { ...state, isConnected: action.isConnected };
    case SET_DATA:
      return { ...state, data: action.data };
    case SET_ERROR:
      return { ...state, error: action.error };
    case SET_LOADED:
      return { ...state, isLoaded: action.isLoaded };
    default:
      return state;
  }
};
