import Web3 from 'web3';

/** Actions **/
import { createTablespace, updateTablespace } from 'entities/models/tablespaces';
import { updateEntities } from 'entities/actions';
import { closeModal } from 'services/modals';

/** Types **/
import {
  DELETE_TABLESPACE_REQUEST,
  DELETE_TABLESPACE_SUCCESS,
  DELETE_TABLESPACE_FAILURE,

  FETCH_TABLESPACE_REQUEST,
  FETCH_TABLESPACE_SUCCESS,
  FETCH_TABLESPACE_FAILURE,

  FETCH_TABLESPACES_REQUEST,
  FETCH_TABLESPACES_SUCCESS,
  FETCH_TABLESPACES_FAILURE,

  SEND_TABLESPACE_FORM_REQUEST,
  SEND_TABLESPACE_FORM_SUCCESS,
  SEND_TABLESPACE_FORM_FAILURE,

  TABLESPACE_FORM_ID,

  UPDATE_TABLESPACES,
} from './types';

/**
 * @param {string} hash
 */
export const deleteTablespace = hash => (dispatch, getState, { contract }) => dispatch({
  types: [DELETE_TABLESPACE_REQUEST, DELETE_TABLESPACE_SUCCESS, DELETE_TABLESPACE_FAILURE],
  contract: contract.sendMethod('deleteTablespace', hash)
})

/**
 * @param {string} hash
 */
export const fetchTablespace = hash => (dispatch, getState, { contract }) => dispatch({
  types: [FETCH_TABLESPACE_REQUEST, FETCH_TABLESPACE_SUCCESS, FETCH_TABLESPACE_FAILURE],
  contract: contract.callMethod('getTablespace', hash)
    .then(({ name, tables }) => dispatch(updateTablespace(hash, { name, tables })))
})

export const fetchTablespaces = () => (dispatch, getState, { contract }) => dispatch({
  types: [FETCH_TABLESPACES_REQUEST, FETCH_TABLESPACES_SUCCESS, FETCH_TABLESPACES_FAILURE],
  contract: contract.callMethod('getStorage')
    .then(({ tablespaces }) => {
      const entities = { tablespaces: {}};

      tablespaces.forEach(hash => { entities.tablespaces[hash] = { hash }});

      dispatch(updateEntities({ entities }));
      dispatch(updateTablespaces(tablespaces));
    })
});

/**
 * @param name
 */
export const sendTablespaceForm = ({ name }) => (dispatch, getState, { contract }) => {
  const hash = Web3.utils.sha3(name);
  const payload = {
    hash, name,
    isFetching: true,
    tables: [],
  };

  // @todo - add redux batched
  dispatch(createTablespace(hash, payload));
  dispatch(updateTablespaces([hash]));
  dispatch(closeModal(TABLESPACE_FORM_ID));

  dispatch({
    types: [SEND_TABLESPACE_FORM_REQUEST, SEND_TABLESPACE_FORM_SUCCESS, SEND_TABLESPACE_FORM_FAILURE],
    contract: contract.sendMethod('createTablespace', name, '0x29a60CeA1aDED2EF4B64Ed219Acdb0F351B5ADed')
      .then(res => console.log(res))
  });
}

export const updateTablespaces = payload => ({ type: UPDATE_TABLESPACES, payload });
