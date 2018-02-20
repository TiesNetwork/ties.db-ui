import hash from 'hash.js';

/** Actions **/
import { createTablespace } from 'entities/models/tablespaces';
import { closeModal } from 'services/modals';

/** Types **/
import {
  CREATE_TABLESPACE,
  TABLESPACE_FORM_ID,
} from './types';


export const sendTablespaceForm = ({ name }) => dispatch => {
  const id = hash.sha256().update(`${name}${new Date().toString()}`).digest('hex');

  dispatch(createTablespace(id, { id, name, tables: [] }));
  dispatch(closeModal(TABLESPACE_FORM_ID));

  dispatch({ type: CREATE_TABLESPACE, id });
};
