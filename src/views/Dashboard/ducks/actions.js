/** Actions **/
import { updateTablespace } from 'entities/models/tablespaces';
// import { closeModal } from 'services/modals';
import { updateEntities } from 'entities/actions';

/** Types **/
import {
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
import {closeModal} from "services/modals";

/**
 * @param {string} hash
 */
export const fetchTablespace = hash => (dispatch, getState, { contract }) => dispatch({
  types: [FETCH_TABLESPACE_REQUEST, FETCH_TABLESPACE_SUCCESS, FETCH_TABLESPACE_FAILURE],
  contract: contract.callMethod('getTablespace', hash)
    .then(({ name, tables, ...res }) => {
      console.log(res)
      dispatch(updateTablespace(hash, { name, tables }));
    })
})

export const fetchTablespaces = () => (dispatch, getState, { contract, schema }) => dispatch({
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
  dispatch(closeModal(TABLESPACE_FORM_ID));
  dispatch({
    types: [SEND_TABLESPACE_FORM_REQUEST, SEND_TABLESPACE_FORM_SUCCESS, SEND_TABLESPACE_FORM_FAILURE],
    contract: contract.sendMethod('createTablespace', name, '0x29a60CeA1aDED2EF4B64Ed219Acdb0F351B5ADed')
      .then(res => console.log(res))
  });
}

export const updateTablespaces = payload => ({ type: UPDATE_TABLESPACES, payload });



// createTablespace(name).then(res => console.log(res));
// const id = hash.sha256().update(`${name}${new Date().toString()}`).digest('hex');
//
// dispatch(createTablespace(id, { id, name, tables: [] }));
// dispatch(closeModal(TABLESPACE_FORM_ID));
//
// dispatch({ type: CREATE_TABLESPACE, id });
