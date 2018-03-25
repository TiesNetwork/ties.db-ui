import { merge } from 'lodash';
import { combineReducers } from 'redux';

import { UPDATE_ENTITIES } from './types';

/** Model reducers **/
import fields from './models/fields';
import indexes from './models/indexes';
import tables from './models/tables';
import tablespaces from './models/tablespaces';
import transactions from './models/transactions';
import triggers from './models/triggers';

const modelsReducer = combineReducers({
  fields,
  indexes,
  tables,
  tablespaces,
  transactions,
  triggers,
});

export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ENTITIES:
      return merge({}, state, action.data.entities);
    default:
      return modelsReducer(state, action);
  }
};
