import {
  CLOSE_MODAL,
  CLOSE_MODALS,
  OPEN_MODAL,
} from './types';

export const closeModal = id => ({ type: CLOSE_MODAL, id });
export const closeModals = () => ({ type: CLOSE_MODALS });
export const openModal = (id, props) => ({ type: OPEN_MODAL, id, props });
