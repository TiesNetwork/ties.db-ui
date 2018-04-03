import { get } from 'lodash';
import Web3 from 'web3';

/** Actions **/
import { closeModal } from 'services/modals';

import {
  createIndex as createIndexEntity,
  deleteIndex as deleteIndexEntity,
} from 'entities/models/indexes';

import {
  createIndex as createIndexInTableEntity,
  deleteIndex as deleteIndexInTableEntity,
} from 'entities/models/tables';

import { updateIndex } from 'entities/models/indexes';

/** Types **/
import {
  CREATE_INDEX_REQUEST,
  CREATE_INDEX_SUCCESS,
  CREATE_INDEX_FAILURE,

  DELETE_INDEX_REQUEST,
  DELETE_INDEX_SUCCESS,
  DELETE_INDEX_FAILURE,

  FETCH_INDEX_REQUEST,
  FETCH_INDEX_SUCCESS,
  FETCH_INDEX_FAILURE,

  INDEXES_FORM_ID,
} from './types';

/**
 * @param {string} tableHash
 *
 * @param {Array} fields
 * @param {string} name
 * @param {string} type
 */
export const createIndex = (tableHash, { fields, name, type }) => (dispatch, getState, { contract }) => {
  const hash = Web3.utils.sha3(name);

  dispatch({
    types: [CREATE_INDEX_REQUEST, CREATE_INDEX_SUCCESS, CREATE_INDEX_FAILURE],
    contract: contract.sendMethod('createIndex', tableHash, name, type, fields),
    transaction: {
      action: 'Create index',
      data: { fields, name, type },
      link: `indexes.${hash}`,
      name: name,
      onCreate: () => {
        dispatch(closeModal(INDEXES_FORM_ID));
        dispatch(createIndexEntity(hash, { fields, name, type }));
        dispatch(createIndexInTableEntity(tableHash, hash));
      },
    },
  });
}

/**
 * @param {string} tableHash
 * @param {string} hash
 */
export const deleteIndex = (tableHash, hash) => (dispatch, getState, { contract }) => {
  const { entities } = getState();
  const index = get(entities, `indexes.${hash}`, {});

  dispatch({
    types: [DELETE_INDEX_REQUEST, DELETE_INDEX_SUCCESS, DELETE_INDEX_FAILURE],
    contract: contract.sendMethod('deleteIndex', tableHash, hash),
    transaction: {
      action: 'Delete index',
      link: `indexes.${hash}`,
      name: index.name,
      onCreate: () => dispatch(closeModal(INDEXES_FORM_ID)),
      onSuccess: () => {
        dispatch(deleteIndexEntity(hash));
        dispatch(deleteIndexInTableEntity(tableHash, hash));
      },
    },
  });
}

/**
 * @param {string} tableHash
 * @param {string} hash
 */
export const fetchIndex = (tableHash, hash) => (dispatch, getState, { contract }) => ({
  types: [FETCH_INDEX_REQUEST, FETCH_INDEX_SUCCESS, FETCH_INDEX_FAILURE],
  contract: contract.callMethod('getIndex', tableHash, hash)
    .then(({ fields, iType: type, name }) => dispatch(updateIndex(hash, { fields, type, name })))
});
