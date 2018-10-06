import React from 'react';
import { reduxForm } from 'redux-form';
import { compose } from 'recompose';

// Components
import Button from 'components/Button';
import Form, { Actions, Input } from 'components/Form';

import styles from './Form.scss';

const TransactionForm = ({
  handleSubmit,
  onReject,
  onResolve,
}) => (
  <Form onSubmit={handleSubmit}>
    <Input label="From" name="from" readOnly />
    <Input label="To" name="to" readOnly />

    <div className={styles.Group}>
      <Input label="Gas" name="gas" readOnly />
      <Input label="Gas Price" name="gasPrice" readOnly />
    </div>

    <Actions>
      <Button
        onClick={onReject}
        size={Button.SIZE.LARGE}
        variant={Button.VARIANT.DANGER}
      >
        Reject
      </Button>

      <Button
        onClick={onResolve}
        size={Button.SIZE.LARGE}
        variant={Button.VARIANT.SUCCESS}
      >
        Approve
      </Button>
    </Actions>
  </Form>
);

export default compose(
  reduxForm({
    form: 'confirmTransactionForm',
  }),
)(TransactionForm);
