import { combineReducers } from 'redux';

/** Views reducers **/
import { reducer as dashboard } from './Dashboard';
import { reducer as query } from './Query';

const viewsReducer = combineReducers({
  dashboard,
  query,
});

export default (state = {}, action) => {
  switch (action.type) {
    default:
      return viewsReducer(state, action);
  }
};
