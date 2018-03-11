import Web3 from 'web3';

/** Actions **/
import {
  createTrigger as createTriggerEntity,
  deleteTrigger as deleteTriggerEntity,
  updateTrigger,
} from 'entities/models/triggers';

import {
  createTrigger as createTriggerInTableEntity,
  deleteTrigger as deleteTriggerInTableEntity,
} from 'entities/models/tables';

import { closeModal } from 'services/modals';

/** Types **/
import {
  CREATE_TRIGGER_REQUEST,
  CREATE_TRIGGER_SUCCESS,
  CREATE_TRIGGER_FAILURE,

  DELETE_TRIGGER_REQUEST,
  DELETE_TRIGGER_SUCCESS,
  DELETE_TRIGGER_FAILURE,

  FETCH_TRIGGER_FAILURE,
  FETCH_TRIGGER_REQUEST,
  FETCH_TRIGGER_SUCCESS,

  TRIGGER_FORM_ID,
} from './types';

/**
 * @param {string} tableHash
 *
 * @param {string} name
 * @param {string} payload
 */
export const createTrigger = (tableHash, { name, payload }) => (dispatch, getState, { contract }) => ({
  types: [CREATE_TRIGGER_REQUEST, CREATE_TRIGGER_SUCCESS, CREATE_TRIGGER_FAILURE],
  contract: contract.sendMethod('createTrigger', tableHash, name, payload)
    .on('transactionHash', transactionHash => {
      const hash = Web3.utils.sha3(name);

      dispatch(createTriggerEntity(hash, { name, payload }));
      dispatch(createTriggerInTableEntity(tableHash, hash));
      dispatch(closeModal(TRIGGER_FORM_ID));
    })
});

/**
 * @param {string} tableHash
 * @param {string} hash
 */
export const deleteTrigger = (tableHash, hash) => (dispatch, getState, { contract }) => ({
  types: [DELETE_TRIGGER_REQUEST, DELETE_TRIGGER_SUCCESS, DELETE_TRIGGER_FAILURE],
  contract: contract.sendMethod('deleteTrigger', tableHash, hash)
    .on('transactionHash', transactionHash => {
      dispatch(deleteTriggerEntity(hash));
      dispatch(deleteTriggerInTableEntity(tableHash, hash));
      dispatch(closeModal(TRIGGER_FORM_ID));
    })
});

/**
 * @param {string} tableHash
 * @param {string} hash
 */
export const fetchTrigger = (tableHash, hash) => (dispatch, getState, { contract }) => ({
  types: [FETCH_TRIGGER_REQUEST, FETCH_TRIGGER_SUCCESS, FETCH_TRIGGER_FAILURE],
  contract: contract.callMethod('getTrigger', tableHash, hash)
    .then(({ name, payload }) => dispatch(updateTrigger(hash, { name, payload })))
});
