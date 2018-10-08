import { get, values } from 'lodash';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

// Actions
import { rejectConfirm, resolveConfirm } from 'services/confirm';

// Components
import Form from './components/Form';

import styles from './Transaction.scss';

const Transaction = ({
  handleReject,
  handleSubmit,
  transaction,
  transactionData,
}) => (
  <Fragment>
    {transaction && (
      <div className={styles.Root}>
        <div className={styles.Title}>
          {transactionData ? transactionData.action : Transaction}
        </div>

        <div className={styles.Form}>
          <Form
            data={get(transactionData, 'data')}
            initialValues={{
              ...transaction,
              link: get(transactionData, 'link'),
              name: get(transactionData, 'name'),
            }}
            onReject={handleReject}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    )}
  </Fragment>
);

const mapStateToProps = ({ entities, services }) => ({
  transaction: get(services, 'confirm.transactions', [])[0],
  transactionData: values(get(entities, 'transactions', [])).filter(transaction => transaction.status === 'CONFIRM')[0],
});

const mapDispatchToProps = dispatch => ({
  rejectConfirm: () => dispatch(rejectConfirm()),
  resolveConfirm: () => dispatch(resolveConfirm()),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    handleReject: ({ rejectConfirm }) => () =>
      rejectConfirm && rejectConfirm(),
      handleSubmit: ({ resolveConfirm, transaction }) => () => {
      const onResolve = get(transaction, 'onResolve');

      onResolve && onResolve();
      resolveConfirm && resolveConfirm();
    },
  }),
)(Transaction);
