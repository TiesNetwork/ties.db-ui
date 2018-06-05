import createHistory from 'history/createBrowserHistory'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Web3 from 'web3';

import App from './App';
import Metamask from 'views/Metamask';

import createStore from './store';

const web3 = new Web3(Web3.givenProvider);

Promise.all([
  web3.eth.getAccounts(),
  web3.eth.net.getId(),
]).then(values => {
    const accounts = values[0];
    const network = values[1];

    if (network === 4) {
      return accounts[0];
    } else {
      throw new Error('network');
    }
  })
  .then(account => {
    const history = createHistory();
    const store = createStore({ account, history, web3 });

    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>,
      document.getElementById('root')
    );
  })
  .catch(e => ReactDOM.render(
    <Metamask incorrectNetwork={e.message === 'network'} />,
    document.getElementById('root')
  ))
