import {
  SET_THEME,
} from './types';

const initialState = {
  theme: localStorage.getItem('theme') || 'light',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return { ...state, theme: action.theme };
    default:
      return state;
  }
}
