import { get } from 'lodash';
import Web3 from 'web3';

/** Actions **/
import {
  createTable as createTableEntity,
  deleteTable as deleteTableEntity,
  updateTable
} from 'entities/models/tables';
import {
  createTable as createTableInTablespaceEntity,
  deleteTable as deleteTableInTablespaceEntity,
} from 'entities/models/tablespaces';
import { closeModal } from 'services/modals';
import {
  createTransaction,
  deleteTransaction,
} from 'services/transactions';

/** Types **/
import {
  CREATE_TABLE_REQUEST,
  CREATE_TABLE_SUCCESS,
  CREATE_TABLE_FAILURE,

  DELETE_TABLE_REQUEST,
  DELETE_TABLE_SUCCESS,
  DELETE_TABLE_FAILURE,

  FETCH_TABLE_REQUEST,
  FETCH_TABLE_SUCCESS,
  FETCH_TABLE_FAILURE,

  TABLE_FORM_ID,
} from './types';

/**
 * @param tableName
 * @param tablespaceHash
 */
export const createTable = (tablespaceHash, { name }) => (dispatch, getState, { contract }) => {
  const { entities } = getState();
  const tableSpaceName = get(entities, `tablespaces.${tablespaceHash}`, {}).name;
  const hash = Web3.utils.sha3(`${tableSpaceName}#${name}`);

  dispatch({
    types: [CREATE_TABLE_REQUEST, CREATE_TABLE_SUCCESS, CREATE_TABLE_FAILURE],
    contract: contract.sendMethod('createTable', tablespaceHash, name)
      .on('transactionHash', transactionHash => {
        dispatch(createTransaction(hash));
        dispatch(createTableEntity(hash, {
          hash, name,
          fields: [],
          indexes: [],
          triggers: [],
        }));
        dispatch(createTableInTablespaceEntity(tablespaceHash, hash));
        dispatch(closeModal(TABLE_FORM_ID));
      })
      .on('receipt', () => {
        dispatch(deleteTransaction(hash));
      })
  });
}

/**
 * @param {string} tablespaceHash
 * @param {string} hash
 */
export const deleteTable = (tablespaceHash, hash) => (dispatch, getState, { contract }) => ({
  types: [DELETE_TABLE_REQUEST, DELETE_TABLE_SUCCESS, DELETE_TABLE_FAILURE],
  contract: contract.sendMethod('deleteTable', tablespaceHash, hash)
    .on('transactionHash', transactionHash => {
      dispatch(createTransaction(hash));
      dispatch(closeModal(TABLE_FORM_ID));
    })
    .on('receipt', () => {
      dispatch(deleteTableInTablespaceEntity(tablespaceHash, hash));
      dispatch(deleteTableEntity(hash));
      dispatch(deleteTransaction(hash));
    })
});

/**
 * @param {string} tableHash
 */
export const fetchTable = tableHash => (dispatch, getState, { contract }) => ({
  types: [FETCH_TABLE_REQUEST, FETCH_TABLE_SUCCESS, FETCH_TABLE_FAILURE],
  contract: contract.callMethod('getTable', tableHash)
    .then(({ fields, name, indexes, triggers }) => dispatch(updateTable(tableHash, { fields, indexes, name, triggers })))
});
