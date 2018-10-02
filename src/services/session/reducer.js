import {
  ADD_ACCOUNT,
  SET_CURRENT_ACCOUNT,
} from './types';

const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');

const initialState = {
  accounts,
  currentAccount:
    localStorage.getItem('currentAccount') ||
    (
      accounts && accounts.length > 0
        ? accounts[0].address
        : null
    ),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ACCOUNT:
      return { ...state, accounts: [...state.accounts, action.account]};
    case SET_CURRENT_ACCOUNT:
      return { ...state, currentAccount: action.address };
    default:
      return state;
  }
};
