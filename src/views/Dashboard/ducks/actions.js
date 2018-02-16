import { random, times } from 'lodash';

/** Actions **/
import { createTablespace } from '../../../entities/models/tablespaces';
import { closeModal } from '../../../services/modals';

/** Types **/
import {
  CREATE_TABLESPACE,
  TABLESPACE_FORM_ID,
} from './types';

export const sendTablespaceForm = ({ name }) => dispatch => {
  const id = times(20, () => random(35).toString(36)).join('');

  dispatch(createTablespace(id, { id, name }));
  dispatch(closeModal(TABLESPACE_FORM_ID));

  dispatch({ type: CREATE_TABLESPACE, id });
};
