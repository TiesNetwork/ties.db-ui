import {
  SET_THEME,
  SET_WS,
} from './types';

export const setTheme = theme => ({ type: SET_THEME, theme });
export const setWS = ws => ({ type: SET_WS, ws });
