import { combineReducers } from 'redux';

/** Views reducers **/
import { reducer as dashboard } from './Dashboard';

const viewsReducer = combineReducers({
  dashboard,
});

export default (state = {}, action) => {
  switch (action.type) {
    default:
      return viewsReducer(state, action);
  }
};
