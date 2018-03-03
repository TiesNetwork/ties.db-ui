import hash from 'hash.js';

/** Entities **/
import { createTable } from 'entities/models/tables';
// import { addTable } from 'entities/models/tablespaces';

import { closeModal } from 'services/modals';

/** Types **/
import {
  TABLE_FORM_ID,
} from './types';

export const sendTableForm = ({ tablespaceId, ...payload }) => dispatch => {
  const id = hash.sha256().update(`${payload.name}${new Date().toString()}`).digest('hex');
  const tableData = {
    id,
    fields: [],
    indexes: [],
    triggers: [],
  };

  dispatch(createTable(id, { ...tableData, ...payload }));
  // dispatch(addTable(tablespaceId, id));
  dispatch(closeModal(TABLE_FORM_ID));
};
