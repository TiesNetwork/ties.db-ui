import { applyMiddleware, createStore } from 'redux';

/** Api **/
import { Contract, schema } from 'api';

/** Middleware **/
import { routerMiddleware } from 'react-router-redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk';

import contractMiddleware from './middlewares/contract';

import reducer from './reducer';

export default ({ account, history, web3 }) => {
  const contract = new Contract({
    account, web3,
    address: '0x22d1b55ebb5bcd17084c3c9d690056875263fec1',
  });

  return createStore(reducer, applyMiddleware(
    routerMiddleware(history),
    loggerMiddleware,
    thunkMiddleware.withExtraArgument({ contract, schema }),
    contractMiddleware
  ));
};
