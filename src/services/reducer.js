import { combineReducers } from 'redux';

/** Services reducers **/
import modals from './modals';

const servicesReducer = combineReducers({
  modals,
});

export default (state = {}, action) => {
  switch (action.type) {
    default:
      return servicesReducer(state, action);
  }
};
