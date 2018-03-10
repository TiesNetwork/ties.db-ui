import { get } from 'lodash';
import Web3 from 'web3';

/** Actions **/
import { createTable, updateTable } from 'entities/models/tables';
import { addTable } from 'entities/models/tablespaces';
import { closeModal } from 'services/modals';

/** Types **/
import {
  CREATE_TABLE_REQUEST,
  CREATE_TABLE_SUCCESS,
  CREATE_TABLE_FAILURE,

  FETCH_TABLE_REQUEST,
  FETCH_TABLE_SUCCESS,
  FETCH_TABLE_FAILURE,

  TABLE_FORM_ID,
} from './types';

/**
 * @param {string} tableHash
 */
export const fetchTable = tableHash => (dispatch, getState, { contract }) => ({
  types: [FETCH_TABLE_REQUEST, FETCH_TABLE_SUCCESS, FETCH_TABLE_FAILURE],
  contract: contract.callMethod('getTable', tableHash)
    .then(({ fields, name, indexes, triggers }) => dispatch(updateTable(tableHash, { fields, indexes, name, triggers })))
});

/**
 * @param {string} tableName
 * @param {string} tablespaceHash
 */
export const sendTableForm = ({ name: tableName, tablespaceHash }) => (dispatch, getState, { contract }) => {
  const { entities } = getState();

  const tableSpaceName = get(entities, `tablespaces.${tablespaceHash}`, {}).name;

  const tableHash = Web3.utils.sha3(`${tableSpaceName}#${tableName}`);
  const payload = {
    hash: tableHash,
    name: tableName,
    fields: [],
    indexes: [],
    triggers: [],
  };

  dispatch(createTable(tableHash, payload));
  dispatch(addTable(tablespaceHash, tableHash))
  dispatch(closeModal(TABLE_FORM_ID));

  dispatch({
    types: [CREATE_TABLE_REQUEST, CREATE_TABLE_SUCCESS, CREATE_TABLE_FAILURE],
    contract: contract.sendMethod('createTable', tablespaceHash, tableName)
      .then(res => console.log(res))
  });
};
