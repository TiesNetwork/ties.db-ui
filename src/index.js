import createHistory from 'history/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import SignerProvider from 'ethjs-provider-signer';

// Actions
import { openModal } from 'services/modals';

// Views
import App from './App';
import Metamask from 'views/Metamask';

import createStore from './store';

const provider = new SignerProvider('https://rinkeby.infura.io/v3/5915e2ed5f234c2aba3dfcb23b8f4337', {
  accounts: cb => cb(null, ['0x8de2472fa85d214f79207f5b310f1335bca0dc75']),
  signTransaction: (rawTx, cb) => console.log(123, rawTx, cb),
});

const web3 = new Web3(provider); // eslint-disable-line

Promise.all([
  web3.eth.getAccounts(),
  web3.eth.net.getId(),
]).then(values => {
    const accounts = values[0];
    const network = values[1];

    if (network === 4) {
      return accounts[0];
    } else {
      throw new Error(JSON.stringify({
        incorrectNetwork: network !== 4,
        notAuthorized: accounts.length === 0,
      }));
    }
  })
  .then(account => {
    const history = createHistory();
    const store = createStore({ account, history, web3 });

    provider.options.signTransaction = (rawTx, cb) => {
      store.dispatch(openModal('prompt', {
        props: {
          label: 'Password',
          onSubmit: value => console.log(value),
        },
        title: 'Confirm transaction',
      }));
    };

    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>,
      document.getElementById('root')
    );
  })
  .catch(e => {
    let props = {};

    try {
      props = JSON.parse(e.message);
    } catch(e) {}

    ReactDOM.render(
      <Metamask {...props} />,
      document.getElementById('root')
    );
  });
