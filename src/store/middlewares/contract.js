/** Actions **/
import {
  createTransaction,
  deleteTransaction,
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
        .on('receipt', ({ transactionHash: hash }) => {
          next(deleteTransaction(hash));
          onSuccess && onSuccess(hash);
        })
        .on('transactionHash', hash => {
          next(createTransaction(hash, { ...payload, hash }));
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
