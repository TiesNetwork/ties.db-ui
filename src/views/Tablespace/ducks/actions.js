/** Actions **/
import { updateTable } from 'entities/models/tables';

/** Types **/
import {
  FETCH_TABLE_REQUEST,
  FETCH_TABLE_SUCCESS,
  FETCH_TABLE_FAILURE,
} from './types';

export const fetchTable = hash => (dispatch, getState, { contract }) => ({
  types: [FETCH_TABLE_REQUEST, FETCH_TABLE_SUCCESS, FETCH_TABLE_FAILURE],
  contract: contract.callMethod('getTable', hash)
    .then(({ fields, indexes, name, triggers }) =>
      dispatch(updateTable(hash, { fields, indexes, name, triggers }))
    )
});


/** Entities **/
// import { createTable } from 'entities/models/tables';
// // import { addTable } from 'entities/models/tablespaces';
//
// import { closeModal } from 'services/modals';
//
// /** Types **/
// import {
//   TABLE_FORM_ID,
// } from './types';

// export const sendTableForm = ({ tablespaceId, ...payload }) => dispatch => {
//   const id = hash.sha256().update(`${payload.name}${new Date().toString()}`).digest('hex');
//   const tableData = {
//     id,
//     fields: [],
//     indexes: [],
//     triggers: [],
//   };
//
//   dispatch(createTable(id, { ...tableData, ...payload }));
//   // dispatch(addTable(tablespaceId, id));
//   dispatch(closeModal(TABLE_FORM_ID));
// };
