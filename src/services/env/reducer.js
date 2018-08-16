import {
  SET_THEME,
  SET_WS,
} from './types';

const initialState = {
  theme: localStorage.getItem('theme') || 'light',
  ws: localStorage.getItem('ws') || 'http://localhost:8080',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return { ...state, theme: action.theme };
    case SET_WS:
      return { ...state, ws: action.ws };
    default:
      return state;
  }
}
