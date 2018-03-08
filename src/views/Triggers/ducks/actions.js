/** Actions **/
import { updateTrigger } from 'entities/models/triggers';

/** Types **/
import {
  FETCH_TRIGGER_FAILURE,
  FETCH_TRIGGER_REQUEST,
  FETCH_TRIGGER_SUCCESS,

  SEND_TRIGGER_FORM_REQUEST,
  SEND_TRIGGER_FORM_SUCCESS,
  SEND_TRIGGER_FORM_FAILURE,
} from './types';

/**
 * @param {string} tableHash
 * @param {string} hash
 */
export const fetchTrigger = (tableHash, hash) => (dispatch, getState, { contract }) => ({
  types: [FETCH_TRIGGER_REQUEST, FETCH_TRIGGER_SUCCESS, FETCH_TRIGGER_FAILURE],
  contract: contract.callMethod('getTrigger', tableHash, hash)
    .then(({ name, payload }) => dispatch(updateTrigger(hash, { name, payload })))
});

/**
 * @param {string} tableHash
 *
 * @param {string} name
 * @param {string} payload
 */
export const sendTriggerForm = (tableHash, { name, payload }) => (dispatch, getState, { contract }) => ({
  types: [SEND_TRIGGER_FORM_REQUEST, SEND_TRIGGER_FORM_SUCCESS, SEND_TRIGGER_FORM_FAILURE],
  contract: contract.sendMethod('createTrigger', tableHash, name, payload)
    .then(res => console.log(res))
});
