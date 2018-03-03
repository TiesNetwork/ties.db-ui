import { normalize } from 'normalizr';

/** Actions **/
import { updateTablespace } from 'entities/models/tablespaces';
// import { closeModal } from 'services/modals';
import { updateEntities } from 'entities/actions';

/** Types **/
import {
  // CREATE_TABLESPACE,
  // TABLESPACE_FORM_ID,

  FETCH_TABLESPACE_REQUEST,
  FETCH_TABLESPACE_SUCCESS,
  FETCH_TABLESPACE_FAILURE,

  FETCH_TABLESPACES_REQUEST,
  FETCH_TABLESPACES_SUCCESS,
  FETCH_TABLESPACES_FAILURE,

  UPDATE_TABLESPACES,
} from './types';

export const fetchTablespace = hash => (dispatch, getState, { contract }) => dispatch({
  types: [FETCH_TABLESPACE_REQUEST, FETCH_TABLESPACE_SUCCESS, FETCH_TABLESPACE_FAILURE],
  contract: contract.callMethod('getTablespace', hash)
    .then(({ name, tables }) => {
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

export const sendTablespaceForm = ({ name }) => (dispatch, getState, { contract }) => dispatch({
  types: ['1', '2', '3'],
  contract: contract.sendMethod('createTablespace', name, '0x22d1b55ebb5bcd17084c3c9d690056875263fec1')
    .then(res => console.log(res))
});

export const updateTablespaces = payload => ({ type: UPDATE_TABLESPACES, payload });



// createTablespace(name).then(res => console.log(res));
// const id = hash.sha256().update(`${name}${new Date().toString()}`).digest('hex');
//
// dispatch(createTablespace(id, { id, name, tables: [] }));
// dispatch(closeModal(TABLESPACE_FORM_ID));
//
// dispatch({ type: CREATE_TABLESPACE, id });
