/** Actions **/
import { updateIndex } from 'entities/models/indexes';

/** Types **/
import {
  FETCH_INDEX_REQUEST,
  FETCH_INDEX_SUCCESS,
  FETCH_INDEX_FAILURE,
} from './types';

/**
 * @param {string} tableHash
 * @param {string} hash
 */
export const fetchIndex = (tableHash, hash) => (dispatch, getState, { contract }) => ({
  types: [FETCH_INDEX_REQUEST, FETCH_INDEX_SUCCESS, FETCH_INDEX_FAILURE],
  contract: contract.callMethod('getIndex', tableHash, hash)
    .then(({ fields, iType: type, name }) => dispatch(updateIndex(hash, { fields, type, name })))
});
