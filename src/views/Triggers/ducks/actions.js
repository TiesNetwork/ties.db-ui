/** Actions **/
import { updateTrigger } from 'entities/models/triggers';

/** Types **/
import {
  FETCH_TRIGGER_FAILURE,
  FETCH_TRIGGER_REQUEST,
  FETCH_TRIGGER_SUCCESS
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
