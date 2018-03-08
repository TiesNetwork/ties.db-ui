import {
  FETCH_FIELD_REQUEST,
  FETCH_FIELD_SUCCESS,
  FETCH_FIELD_FAILURE,
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
