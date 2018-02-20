import hash from 'hash.js';

/** Actions **/
import { createField } from 'entities/models/fields';
import { createIndex } from 'entities/models/indexes';
import { createTrigger } from 'entities/models/triggers';
import { addField, addIndex, addTrigger } from 'entities/models/tables';

import {createDownload, deleteDownload} from 'services/background';
import { closeModal } from 'services/modals';

/** Types **/
import {
  CONFIRM_FORM_ID,
  FIELD_FORM_ID,
  INDEX_FORM_ID,
  TRIGGER_FORM_ID,
} from './types';

export const sendConfirmForm = ({ tableId }) => dispatch => {
  dispatch(createDownload(tableId));
  dispatch(closeModal(CONFIRM_FORM_ID));

  setTimeout(() => {
    dispatch(deleteDownload(tableId));
  }, 2000);
};

export const sendFieldForm = ({ tableId, ...payload }) => dispatch => {
  const id = hash.sha256().update(`${payload.name}${new Date().toString()}`).digest('hex');

  dispatch(createField(id, { ...payload, id }));
  dispatch(addField(tableId, id));
  dispatch(closeModal(FIELD_FORM_ID));
};

export const sendIndexForm = ({ tableId, ...payload }) => dispatch => {
  const id = hash.sha256().update(`${payload.name}${new Date().toString()}`).digest('hex');

  dispatch(createIndex(id, { ...payload, id }));
  dispatch(addIndex(tableId, id));
  dispatch(closeModal(INDEX_FORM_ID));
};

export const sendTriggerForm = ({ tableId, ...payload }) => dispatch => {
  const id = hash.sha256().update(`${payload.name}${new Date().toString()}`).digest('hex');

  dispatch(createTrigger(id, { ...payload, id }));
  dispatch(addTrigger(tableId, id));
  dispatch(closeModal(TRIGGER_FORM_ID));
};
