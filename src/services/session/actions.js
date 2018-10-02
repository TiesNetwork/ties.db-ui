import { get } from 'lodash';

import {
  ADD_ACCOUNT,
  SET_CURRENT_ACCOUNT,
} from './types';

export const addAccount = account => (dispatch, getStore) => {
  const store = getStore();

  if (account) {
    const accounts = get(store, 'services.session.accounts', []);
    const hasAccount = accounts.filter(({ address }) => address === account.address).length > 0;

    if (!hasAccount) {
      localStorage.setItem('accounts', JSON.stringify([...accounts, account]));

      dispatch({ type: ADD_ACCOUNT, account });
      dispatch(setCurrentAccount(account.address));

      window.location.reload();
    }
  }
};

export const setCurrentAccount = address => dispatch => {
  if (address) {
    localStorage.setItem('currentAccount', address);
    dispatch({ type: SET_CURRENT_ACCOUNT, address });
  }
};
