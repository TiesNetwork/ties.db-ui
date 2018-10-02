import { get } from 'lodash';
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
  handleResolve,
  transaction,
}) => (
  <Fragment>
    {transaction && (
      <div className={styles.Root}>
        <div className={styles.Title}>
          Transaction
        </div>

        <div className={styles.Form}>
          <Form
            initialValues={transaction}
            onReject={handleReject}
            onResolve={handleResolve}
          />
        </div>
      </div>
    )}
  </Fragment>
);

const mapStateToProps = ({ services }) => ({
  transaction: get(services, 'confirm.transactions', [])[0],
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
    handleResolve: ({ resolveConfirm, transaction }) => () => {
      const onResolve = get(transaction, 'onResolve');

      onResolve && onResolve();
      resolveConfirm && resolveConfirm();
    },
  }),
)(Transaction);
