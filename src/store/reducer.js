import { combineReducers } from 'redux'

/** External reducers **/
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form';

/** Reducers **/
import entities from '../entities/reducer';
import services from '../services/reducer';
import views from '../views/reducer';

export default combineReducers({
  entities,
  form,
  services,
  router,
  views,
});
