import { get } from 'lodash';

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
// import {deleteIndex as deleteIndexEntity} from "entities/models/indexes";

/**
 * @param {string} tableHash
 *
 * @param {string} name
 * @param {string} payload
 */
export const createTrigger = (tableHash, { name, payload }) => (dispatch, getState, { contract }) => {
  const hash = Web3.utils.sha3(name); // eslint-disable-line

  dispatch({
    types: [CREATE_TRIGGER_REQUEST, CREATE_TRIGGER_SUCCESS, CREATE_TRIGGER_FAILURE],
    contract: contract.sendMethod('createTrigger', tableHash, name, payload),
    transaction: {
      action: 'Create trigger',
      data: { name, payload },
      link: `triggers.${hash}`,
      name: name,
      onCreate: () => {
        dispatch(closeModal(TRIGGER_FORM_ID));
        dispatch(createTriggerEntity(hash, { name, payload }));
        dispatch(createTriggerInTableEntity(tableHash, hash));
      },
    },
  });
}

/**
 * @param {string} tableHash
 * @param {string} hash
 */
export const deleteTrigger = (tableHash, hash) => (dispatch, getState, { contract }) => {
  const { entities } = getState();
  const trigger = get(entities, `triggers.${hash}`, {});

  dispatch({
    types: [DELETE_TRIGGER_REQUEST, DELETE_TRIGGER_SUCCESS, DELETE_TRIGGER_FAILURE],
    contract: contract.sendMethod('deleteTrigger', tableHash, hash),
    transaction: {
      action: 'Delete trigger',
      link: `triggers.${hash}`,
      name: trigger.name,
      onCreate: () => dispatch(closeModal(TRIGGER_FORM_ID)),
      onSuccess: () => {
        dispatch(deleteTriggerEntity(hash));
        dispatch(deleteTriggerInTableEntity(tableHash, hash));
      },
    },
  });
}

/**
 * @param {string} tableHash
 * @param {string} hash
 */
export const fetchTrigger = (tableHash, hash) => (dispatch, getState, { contract }) => ({
  types: [FETCH_TRIGGER_REQUEST, FETCH_TRIGGER_SUCCESS, FETCH_TRIGGER_FAILURE],
  contract: contract.callMethod('getTrigger', tableHash, hash)
    .then(({ name, payload }) => dispatch(updateTrigger(hash, { name, payload })))
});
