import { random, times } from 'lodash';

/** Actions **/
import { createField } from '../../../entities/models/fields';
import { addField } from '../../../entities/models/tables';
import { closeModal } from '../../../services/modals';

/** Types **/
import {
  FIELD_FORM_ID,
} from './types';

export const sendFieldForm = payload => dispatch => {
  const id = times(20, () => random(35).toString(36)).join('');

  dispatch(createField(id, { ...payload, id }));
  dispatch(addField(0, id));
  dispatch(closeModal(FIELD_FORM_ID));
};
