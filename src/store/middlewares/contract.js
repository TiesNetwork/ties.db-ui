/** Actions **/
import {
  createTransaction,
  updateTransaction,
} from 'entities/models/transactions';

/** Types **/
import {
  CONFIRMATION,
  // ERROR,
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
          }
        })
        .on('error', (message, res) => {
          console.info(message[0], res);
          onError && onError();
          // @todo - wtf, res undefined
          // next(updateTransaction(hash, { status: ERROR }));
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
