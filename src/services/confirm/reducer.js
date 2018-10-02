import {
  CREATE_CONFIRM,
  REJECT_CONFIRM,
  RESOLVE_CONFIRM,
} from './types';

const initialState = {
  transactions: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CONFIRM:
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case REJECT_CONFIRM:
    case RESOLVE_CONFIRM:
      return {
        ...state,
        transactions: state.transactions.filter((item, index) => index !== 0)
      }
    default:
      return state;
  }
}
