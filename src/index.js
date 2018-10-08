import { ipcRenderer } from 'electron';
import createHistory from 'history/createBrowserHistory';
import { get } from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import SignerProvider from 'ethjs-provider-signer';
import { sign } from 'ethjs-signer';

// Actions
import { createConfirm } from 'services/confirm';
import { createNotification } from 'services/notifications';
import { closeModal, closeModals, openModal } from 'services/modals';

// Views
import App from './App';
import Metamask from 'views/Metamask';

import createStore from './store';

const provider = new SignerProvider('https://rinkeby.infura.io/v3/5915e2ed5f234c2aba3dfcb23b8f4337', {
  accounts: cb => {
    const accounts = JSON.parse(localStorage.getItem('accounts') || '[]')
      .map(account => `0x${get(account, 'address')}`);

    cb(null, accounts);
  },
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
    let transactionCount = 0;
    let nonce = 0;

    const history = createHistory();
    const store = createStore({ account, history, web3 });

    provider.options.signTransaction = (rawTx, cb, test) => {
      const state = store.getState();

      web3.eth.estimateGas(rawTx).then(gas => {
        rawTx.gas = gas;
        rawTx.gasPrice = web3.utils.toWei('10', 'gwei');

        const currentAccount = get(state, 'services.session.currentAccount');
        const session = JSON.parse(sessionStorage.getItem('session'));

        const sendTransaction = key => {
          web3.eth.getTransactionCount(session.address).then(res => {
            if (res !== transactionCount) {
              nonce = 0;
              transactionCount = res;
            } else {
              nonce++;
            }

            rawTx.nonce = transactionCount + nonce;

            key && cb(null, sign(rawTx, key));
            store.dispatch(closeModal('transactionForm'));
          });
        };

        if (!session || session.address !== currentAccount) {
          store.dispatch(openModal('transactionForm', {
            props: {
              label: 'Password',
              onSubmit: ({ account, password }) => {
                ipcRenderer.send('recover', { account, password });
                ipcRenderer.on('recover', (event, key) => {
                  if (key) {
                    sessionStorage.setItem('session', JSON.stringify({
                      address: account.address,
                      privateKey: key,
                    }));

                    sendTransaction(key);
                  }
                });
              },
            },
            title: 'Confirm transaction',
          }));
        } else {
          store.dispatch(closeModals());
          store.dispatch(createConfirm({
            ...rawTx,
            onResolve: () => sendTransaction(session.privateKey),
          }));
        }
      });
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
    console.log('WATAFAAAAAAK!!!!!');
    try { props = JSON.parse(e.message) } catch(e) {}

    ReactDOM.render(
      <Metamask {...props} />,
      document.getElementById('root')
    );
  });
