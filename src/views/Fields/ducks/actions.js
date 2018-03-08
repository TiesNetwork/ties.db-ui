import {
  FETCH_FIELD_REQUEST,
  FETCH_FIELD_SUCCESS,
  FETCH_FIELD_FAILURE,

  SEND_FIELD_FORM_REQUEST,
  SEND_FIELD_FORM_SUCCESS,
  SEND_FIELD_FORM_FAILURE,
} from './types';

/** Actions **/
import { updateField } from 'entities/models/fields';

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

/**
 * @param {string} tableHash
 *
 * @param {string=} defaultValue
 * @param {string} name
 * @param {string} type
 */
export const sendFieldForm = (tableHash, { defaultValue, name, type }) => (dispatch, getState, { contract }) => ({
  types: [SEND_FIELD_FORM_REQUEST, SEND_FIELD_FORM_SUCCESS, SEND_FIELD_FORM_FAILURE],
  contract: contract.sendMethod('createField', tableHash, name, type, defaultValue)
    .then(res => console.log(res))
});
