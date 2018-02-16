import { applyMiddleware, createStore } from 'redux';

import demo from './demo';

/** Middleware **/
import { routerMiddleware } from 'react-router-redux'
import loggerMiddleware from 'redux-logger'
import thunk from 'redux-thunk';

import reducer from './reducer';

export default history => createStore(reducer, demo, applyMiddleware(
  routerMiddleware(history),
  loggerMiddleware,
  thunk
));
