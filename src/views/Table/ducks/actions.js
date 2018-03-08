import hash from 'hash.js';

/** Actions **/
import { createField, updateField } from 'entities/models/fields';
import { createIndex, updateIndex } from 'entities/models/indexes';
import { createTrigger, updateTrigger } from 'entities/models/triggers';
import { addField, addIndex, addTrigger } from 'entities/models/tables';

import { closeModal } from 'services/modals';

/** Types **/
import {
  FIELD_FORM_ID,
  INDEX_FORM_ID,
  TRIGGER_FORM_ID,

  FETCH_FIELD_REQUEST,
  FETCH_FIELD_SUCCESS,
  FETCH_FIELD_FAILURE,

  FETCH_INDEX_REQUEST,
  FETCH_INDEX_SUCCESS,
  FETCH_INDEX_FAILURE,

  FETCH_TRIGGER_REQUEST,
  FETCH_TRIGGER_SUCCESS,
  FETCH_TRIGGER_FAILURE,
} from './types';


/**
 * @param {string} tableHash
 * @param {string} hash
 */
export const fetchTrigger = (tableHash, hash) => (dispatch, getState, { contract }) => ({
  types: [FETCH_TRIGGER_REQUEST, FETCH_TRIGGER_SUCCESS, FETCH_TRIGGER_FAILURE],
  contract: contract.callMethod('getTrigger', tableHash, hash)
    .then(({ name, payload }) =>
      dispatch(updateTrigger(hash, { name, payload }))
    )
});

export const sendFieldForm = ({ tableId, ...payload }) => dispatch => {
  const id = hash.sha256().update(`${payload.name}${new Date().toString()}`).digest('hex');

  dispatch(createField(id, { ...payload, id }));
  dispatch(addField(tableId, id));
  dispatch(closeModal(FIELD_FORM_ID));
};

export const sendIndexForm = ({ tableId, ...payload }) => dispatch => {
  const id = hash.sha256().update(`${payload.name}${new Date().toString()}`).digest('hex');

  dispatch(createIndex(id, { ...payload, id }));
  dispatch(addIndex(tableId, id));
  dispatch(closeModal(INDEX_FORM_ID));
};

export const sendTriggerForm = ({ tableId, ...payload }) => dispatch => {
  const id = hash.sha256().update(`${payload.name}${new Date().toString()}`).digest('hex');

  dispatch(createTrigger(id, { ...payload, id }));
  dispatch(addTrigger(tableId, id));
  dispatch(closeModal(TRIGGER_FORM_ID));
};
