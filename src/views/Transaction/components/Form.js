import React from 'react';
import { reduxForm } from 'redux-form';
import ReactJson from 'react-json-view'
import { compose,  withHandlers, withState } from 'recompose';

// Components
import Button from 'components/Button';
import Form, { Actions, Input } from 'components/Form';

import styles from './Form.scss';

const TransactionForm = ({
  data,
  handleSubmit,
  handleTrigger,
  isExpanded,
  onReject,
}) => (
  <Form onSubmit={handleSubmit}>
    <Input label="Name" name="name" readOnly />
    <Input label="Hash" name="link" readOnly />

    {data && (
      <div className={styles.Data}>
        <ReactJson
          displayDataTypes={false}
          enableClipboard={false}
          iconStyle="square"
          src={data}
        />
      </div>
    )}

    <div className={styles.Expand}>
      <button
        className={styles.ExpandTrigger}
        onClick={handleTrigger}
        type="button"
      >
        {isExpanded ? 'Hide' : 'Show more'}
      </button>

      {isExpanded && (
        <div className={styles.ExpandContainer}>
          <Input label="From" name="from" readOnly />
          <Input label="To" name="to" readOnly />

          <div className={styles.Group}>
            <Input label="Gas" name="gas" readOnly />
            <Input label="Gas Price" name="gasPrice" readOnly />
          </div>
        </div>
      )}
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
        size={Button.SIZE.LARGE}
        type="submit"
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
    enableReinitialize: true,
  }),
  withState('isExpanded', 'setExpand', false),
  withHandlers({
    handleTrigger: ({ isExpanded, setExpand }) => () =>
      setExpand(!isExpanded),
  }),
)(TransactionForm);
