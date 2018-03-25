/** Actions **/
import {
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from 'entities/models/transactions';

/** Types **/
import {
  CONFIRMATION,
  PENDING,
} from 'entities/models/transactions';

const contractMiddleware = store => next => action => {
  if (action.contract && action.types) {
    const { contract, transaction } = action;
    const [REQUESTED, RESOLVED, REJECTED] = action.types;

    next({ ...action, type: REQUESTED });

    if (transaction) {
      const {
        onCreate,
        onSuccess,
        ...payload,
      } = transaction;

      contract
        .on('confirmation', (number, { transactionHash: hash }) => {
          next(updateTransaction(hash, { block: number }));

          if (number === 24) {
            next(deleteTransaction(hash));
            onSuccess && onSuccess(hash);
          }
        })
        .on('receipt', ({ transactionHash: hash }) => {
          next(updateTransaction(hash, { status: CONFIRMATION }));
        })
        .on('transactionHash', hash => {
          next(createTransaction(hash, {
            ...payload, hash,
            block: 0,
            status: PENDING,
          }));
          
          onCreate && onCreate(hash);
        })
    }

    return contract
      .then(res => {
        next({ ...action, type: RESOLVED });
      })
      .catch(err => {
        console.error(err);
        next({ ...action, type: REJECTED });
      });
  } else {
    return next(action);
  }
}

export default contractMiddleware;
