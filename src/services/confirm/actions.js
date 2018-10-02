import {
  CREATE_CONFIRM,
  REJECT_CONFIRM,
  RESOLVE_CONFIRM,
} from './types';

export const createConfirm = payload => ({ type: CREATE_CONFIRM, payload });
export const rejectConfirm = () => ({ type: REJECT_CONFIRM });
export const resolveConfirm = () => ({ type: RESOLVE_CONFIRM });
