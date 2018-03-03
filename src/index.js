import createHistory from 'history/createBrowserHistory'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Web3 from 'web3';

import App from './App';
import createStore from './store';

const web3 = new Web3(Web3.givenProvider);

web3.eth.getAccounts()
  .then(accounts => {
    const history = createHistory();
    const store = createStore({ account: accounts[0], history, web3 });

    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>,
      document.getElementById('root')
    );
  });
