import { random, times } from 'lodash';

/** Actions **/
import { createField } from '../../../entities/models/fields';
import { createIndex } from '../../../entities/models/indexes';
import { createTrigger } from '../../../entities/models/triggers';

import { addField, addIndex, addTrigger } from '../../../entities/models/tables';
import { closeModal } from '../../../services/modals';

/** Types **/
import {
  FIELD_FORM_ID,
  INDEX_FORM_ID,
  TRIGGER_FORM_ID,
} from './types';

export const sendFieldForm = ({ tableId, ...payload }) => dispatch => {
  const id = times(20, () => random(35).toString(36)).join('');

  dispatch(createField(id, { ...payload, id }));
  dispatch(addField(tableId, id));
  dispatch(closeModal(FIELD_FORM_ID));
};

export const sendIndexForm = ({ tableId, ...payload }) => dispatch => {
  const id = times(20, () => random(35).toString(36)).join('');

  dispatch(createIndex(id, { ...payload, id }));
  dispatch(addIndex(tableId, id));
  dispatch(closeModal(INDEX_FORM_ID));
};

export const sendTriggerForm = ({ tableId, ...payload }) => dispatch => {
  const id = times(20, () => random(35).toString(36)).join('');

  dispatch(createTrigger(id, { ...payload, id }));
  dispatch(addTrigger(tableId, id));
  dispatch(closeModal(TRIGGER_FORM_ID));
};
