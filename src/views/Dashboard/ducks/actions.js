import { get } from 'lodash';

/** Actions **/
import {
  createTablespace as createTablespaceEntity,
  deleteTablespace as deleteTablespaceEntity,
  updateTablespace,
} from 'entities/models/tablespaces';
import { updateEntities } from 'entities/actions';
import { closeModal } from 'services/modals';

/** Types **/
import {
  CREATE_TABLESPACE,
  DELETE_TABLESPACE,
  UPDATE_TABLESPACES,

  CREATE_TABLESPACE_REQUEST,
  CREATE_TABLESPACE_SUCCESS,
  CREATE_TABLESPACE_FAILURE,

  DELETE_TABLESPACE_REQUEST,
  DELETE_TABLESPACE_SUCCESS,
  DELETE_TABLESPACE_FAILURE,

  FETCH_TABLESPACE_REQUEST,
  FETCH_TABLESPACE_SUCCESS,
  FETCH_TABLESPACE_FAILURE,

  FETCH_TABLESPACES_REQUEST,
  FETCH_TABLESPACES_SUCCESS,
  FETCH_TABLESPACES_FAILURE,

  TABLESPACE_FORM_ID,
} from './types';

/**
 * @param {string} name
 */
export const createTablespace = ({ name }) => (dispatch, getState, { contract }) => {
  const hash = Web3.utils.sha3(name); // eslint-disable-line

  dispatch({
    types: [CREATE_TABLESPACE_REQUEST, CREATE_TABLESPACE_SUCCESS, CREATE_TABLESPACE_FAILURE],
    contract: contract.sendMethod('createTablespace', name, '0x29a60CeA1aDED2EF4B64Ed219Acdb0F351B5ADed'),
    transaction: {
      action: 'Create tablespace',
      data: { name },
      link: `tablespace.${hash}`,
      name: name,
      onCreate: () => dispatch(closeModal(TABLESPACE_FORM_ID)),
      onSuccess: () => {
        dispatch(createTablespaceEntity(hash, { hash, name, tables: [] }));
        dispatch(createTablespaceView(hash));
      },
    },
  });
}

/**
 * @param {string} hash
 */
export const createTablespaceView = hash => ({ type: CREATE_TABLESPACE, hash });

export const deleteTablespace = hash => (dispatch, getState, { contract }) => {
  const { entities } = getState();
  const tablespace = get(entities, `tablespaces.${hash}`, {});

  dispatch({
    types: [DELETE_TABLESPACE_REQUEST, DELETE_TABLESPACE_SUCCESS, DELETE_TABLESPACE_FAILURE],
    contract: contract.sendMethod('deleteTablespace', hash),
    transaction: {
      action: 'Delete tablespace',
      link: `tablespace.${hash}`,
      name: tablespace.name,
      onCreate: () => dispatch(closeModal(TABLESPACE_FORM_ID)),
      onSuccess: () => {
        dispatch(deleteTablespaceView(hash));
        dispatch(deleteTablespaceEntity(hash));
      },
    },
  });
}

/**
 * @param {string} hash
 */
export const deleteTablespaceView = hash => ({ type: DELETE_TABLESPACE, hash });

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

export const updateTablespaces = payload => ({ type: UPDATE_TABLESPACES, payload });
