import Web3 from 'web3';

/** Actions **/
import { closeModal } from 'services/modals';

import {
  createField as createFieldEntity,
  deleteField as deleteFieldEntity,
} from 'entities/models/fields';

import {
  createField as createFieldInTableEntity,
  deleteField as deleteFieldInTableEntity,
} from 'entities/models/tables';

/** Types **/
import {
  CREATE_FIELD_REQUEST,
  CREATE_FIELD_SUCCESS,
  CREATE_FIELD_FAILURE,

  DELETE_FIELD_REQUEST,
  DELETE_FIELD_SUCCESS,
  DELETE_FIELD_FAILURE,

  FETCH_FIELD_REQUEST,
  FETCH_FIELD_SUCCESS,
  FETCH_FIELD_FAILURE,

  FIELD_FORM_ID,
} from './types';

/** Actions **/
import { updateField } from 'entities/models/fields';

/**
 * @param {string} tableHash
 *
 * @param {string=} defaultValue
 * @param {string} name
 * @param {string} type
 */
export const createField = (tableHash, { defaultValue, name, type }) => (dispatch, getState, { contract }) => ({
  types: [CREATE_FIELD_REQUEST, CREATE_FIELD_SUCCESS, CREATE_FIELD_FAILURE],
  contract: contract.sendMethod('createField', tableHash, name, type, defaultValue)
    .on('transactionHash', transactionHash => {
      const hash = Web3.utils.sha3(name);

      dispatch(createFieldEntity(hash, { defaultValue, name, type }));
      dispatch(createFieldInTableEntity(tableHash, hash));
      dispatch(closeModal(FIELD_FORM_ID));
    })
});

/**
 * @param {string} tableHash
 * @param {string} hash
 */
export const deleteField = (tableHash, hash) => (dispatch, getState, { contract }) => ({
  types: [DELETE_FIELD_REQUEST, DELETE_FIELD_SUCCESS, DELETE_FIELD_FAILURE],
  contract: contract.sendMethod('deleteField', tableHash, hash)
    .on('transactionHash', transactionHash => {
      dispatch(deleteFieldEntity(hash));
      dispatch(deleteFieldInTableEntity(tableHash, hash));
      dispatch(closeModal(FIELD_FORM_ID));
    })
});

/**
 * @param {string} tableHash
 * @param {string} hash
 */
export const fetchField = (tableHash, hash) => (dispatch, getState, { contract }) => ({
  types: [FETCH_FIELD_REQUEST, FETCH_FIELD_SUCCESS, FETCH_FIELD_FAILURE],
  contract: contract.callMethod('getField', tableHash, hash)
    .then(({ def: defaultValue, fType: type, name }) =>
      dispatch(updateField(hash, { defaultValue, type, name }))
    )
});
