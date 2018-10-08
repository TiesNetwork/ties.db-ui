import { get, uniqueId, values } from 'lodash';
import { SubmissionError } from 'redux-form';

/** Actions **/
import {
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from 'entities/models/transactions';
import { openModal } from 'services/modals';
import { createNotification, deleteNotification } from 'services/notifications';

/** Types **/
import {
  CONFIRM,
  CONFIRMATION,
  // ERROR,
  ERROR_TYPE,
  FAIL,
  PENDING,
  SUCCESS,
} from 'entities/models/transactions';

const contractMiddleware = store => next => action => {
  if (action.contract && action.types) {
    const { contract, transaction } = action;
    const [REQUESTED, RESOLVED, REJECTED] = action.types;

    next({ ...action, type: REQUESTED });

    if (transaction) {
      const {
        onCreate,
        onError,
        onSuccess,
        ...payload,
      } = transaction;

      const state = store.getState();
      const transactions = values(get(state, 'entities.transactions', [])).filter(transaction => transaction.status === CONFIRM);
      const transactionName = `confirm_${transactions.length}`;

      next(createTransaction(transactionName, {
        ...payload,
        block: 0,
        hash: transactionName,
        status: CONFIRM,
      }));

      contract
        .on('confirmation', (number, { status, transactionHash: hash, ...props }) => {
          const isFail = status === '0x0';
          const isLast = number === 24;

          next(updateTransaction(hash, {
            block: number,
            status: isLast
              ? isFail
                ? FAIL
                : SUCCESS
              : CONFIRMATION,
          }));

          if (isLast) {
            isFail
              ? onError && onError(hash)
              : onSuccess && onSuccess(hash);

            setTimeout(() => next(deleteTransaction(hash)), 5000);
          }
        })
        .on('error', error => {
          const id = uniqueId('transaction_error_');

          next(createNotification(id, { text: error.message }));
          setTimeout(() => next(deleteNotification(id)), 5000);

          onError && onError();
          // @todo - wtf, res undefined
          // next(updateTransaction(hash, { status: ERROR }));
        })
        .on('receipt', ({ transactionHash: hash }) => {
          next(updateTransaction(hash, { status: CONFIRMATION }));
        })
        .on('transactionHash', hash => {
          next(deleteTransaction(transactionName));
          next(createTransaction(hash, {
            ...payload, hash,
            block: 0,
            status: PENDING,
          }));

          contract.on('error', error => {
            console.log('Test', error);
          });

          onCreate && onCreate(hash);
        })
    }

    return contract
      .then(res => {
        next({ ...action, type: RESOLVED });
      })
      .catch(error => {
        const { message } = error;

        switch (message) {
          case ERROR_TYPE.NO_ADDRESS:
            next(openModal('importAccount', { props: { needAuthorization: true }}));
            throw new SubmissionError({ _error: 'Log in account!' });
          default:
            console.error(error);
            break;
        }

        next({ ...action, type: REJECTED });
      });
  } else {
    return next(action);
  }
}

export default contractMiddleware;
