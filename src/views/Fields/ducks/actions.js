import { get } from 'lodash';
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
export const createField = (tableHash, { defaultValue, name, type }) => (dispatch, getState, { contract }) => {
  const hash = Web3.utils.sha3(name);

  return dispatch({
    types: [CREATE_FIELD_REQUEST, CREATE_FIELD_SUCCESS, CREATE_FIELD_FAILURE],
    contract: contract.sendMethod('createField', tableHash, name, type, defaultValue),
    transaction: {
      action: 'Create field',
      data: { defaultValue, name, type },
      link: `fields.${hash}`,
      name: name,
      onCreate: () => {
        dispatch(closeModal(FIELD_FORM_ID));
        dispatch(createFieldEntity(hash, { defaultValue, name, type }));
        dispatch(createFieldInTableEntity(tableHash, hash));
      },
    },
  });
}

/**
 * @param {string} tableHash
 * @param {string} hash
 */
export const deleteField = (tableHash, hash) => (dispatch, getState, { contract }) => {
  const { entities } = getState();
  const field = get(entities, `fields.${hash}`, {});

  dispatch({
    types: [DELETE_FIELD_REQUEST, DELETE_FIELD_SUCCESS, DELETE_FIELD_FAILURE],
    contract: contract.sendMethod('deleteField', tableHash, hash),
    transaction: {
      action: 'Delete field',
      link: `fields.${hash}`,
      name: field.name,
      onCreate: () => dispatch(closeModal(FIELD_FORM_ID)),
      onSuccess: () => {
        dispatch(deleteFieldEntity(hash));
        dispatch(deleteFieldInTableEntity(tableHash, hash));
      },
    },
  });
}

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
