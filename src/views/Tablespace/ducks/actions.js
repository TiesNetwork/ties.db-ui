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


/** Types **/
import {
  CREATE_TABLE_REQUEST,
  CREATE_TABLE_SUCCESS,
  CREATE_TABLE_FAILURE,

  DELETE_TABLE_REQUEST,
  DELETE_TABLE_SUCCESS,
  DELETE_TABLE_FAILURE,

  DISTRIBUTE_TABLE_REQUEST,
  DISTRIBUTE_TABLE_SUCCESS,
  DISTRIBUTE_TABLE_FAILURE,

  FETCH_TABLE_REQUEST,
  FETCH_TABLE_SUCCESS,
  FETCH_TABLE_FAILURE,

  TABLE_FORM_ID,
  TABLE_DISTRIBUTE_FORM_ID,
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
    contract: contract.sendMethod('createTable', tablespaceHash, name),
    transaction: {
      action: 'Create table',
      link: `tables.${hash}`,
      name: name,
      onCreate: () => {
        dispatch(closeModal(TABLE_FORM_ID));
        dispatch(createTableEntity(hash, {
          hash, name,
          fields: [],
          indexes: [],
          triggers: [],
        }));
        dispatch(createTableInTablespaceEntity(tablespaceHash, hash));
      }
    },
  });
}

/**
 * @param {string} tablespaceHash
 * @param {string} hash
 */
export const deleteTable = (tablespaceHash, hash) => (dispatch, getState, { contract }) => {
  const { entities } = getState();
  const table = get(entities, `tables.${hash}`, {});

  dispatch({
    types: [DELETE_TABLE_REQUEST, DELETE_TABLE_SUCCESS, DELETE_TABLE_FAILURE],
    contract: contract.sendMethod('deleteTable', tablespaceHash, hash),
    transaction: {
      action: 'Delete table',
      link: `tables.${hash}`,
      name: table.name,
      onCreate: () => dispatch(closeModal(TABLE_FORM_ID)),
      onSuccess: () => {
        dispatch(deleteTableInTablespaceEntity(tablespaceHash, hash));
        dispatch(deleteTableEntity(hash));
      },
    },
  });
}

/**
 * @param  {string} hash
 * @param  {string} nodes
 * @param  {string} replicas
 */
export const distributeTable = ({ hash, nodes, replicas }) => (dispatch, getState, { contract }) => {
  const { entities } = getState();
  const table = get(entities, `tables.${hash}`, {});

  dispatch({
    types: [DISTRIBUTE_TABLE_REQUEST, DISTRIBUTE_TABLE_SUCCESS, DISTRIBUTE_TABLE_FAILURE],
    contract: contract.sendMethod('distribute', hash, nodes, replicas),
    transaction: {
      action: 'Distribute table',
      link: `tables.${hash}`,
      name: table.name,
      onCreate: () => dispatch(closeModal(TABLE_DISTRIBUTE_FORM_ID)),
    }
  });
}

/**
 * @param {string} tableHash
 */
export const fetchTable = tableHash => (dispatch, getState, { contract }) => ({
  types: [FETCH_TABLE_REQUEST, FETCH_TABLE_SUCCESS, FETCH_TABLE_FAILURE],
  contract: contract.callMethod('getTable', tableHash)
    .then(({ 
      fields, 
      name, 
      indexes, 
      ranges,
      replicas,
      triggers,
    }) => dispatch(updateTable(tableHash, {
      fields, indexes, name, triggers, ranges, replicas,
      distributed: ranges > 0 || replicas > 0,
    })))
});
