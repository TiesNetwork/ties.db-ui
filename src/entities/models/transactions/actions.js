/** Types **/
import {
  CREATE_TRANSACTION,
  DELETE_TRANSACTION,
  UPDATE_TRANSACTION,
} from './types';

export const createTransaction = (hash, payload) => ({ type: CREATE_TRANSACTION, hash, payload });
export const deleteTransaction = hash => ({ type: DELETE_TRANSACTION, hash });
export const updateTransaction = (hash, payload) => ({ type: UPDATE_TRANSACTION, hash, payload });
