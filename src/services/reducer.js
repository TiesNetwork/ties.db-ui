import { combineReducers } from 'redux';

/** Services reducers **/
import background from './background';
import modals from './modals';

const servicesReducer = combineReducers({
  background, modals,
});

export default (state = {}, action) => {
  switch (action.type) {
    default:
      return servicesReducer(state, action);
  }
};
