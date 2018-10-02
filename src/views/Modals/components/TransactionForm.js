import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { compose, withHandlers } from 'recompose';

// Actions
import { closeModal, openModal } from 'services/modals';

// Components
import Button from 'components/Button';
import Form, { Actions, Input } from 'components/Form';

// Utils
import validate, { required } from 'utils/validate';

import styles from './TransactionForm.scss';

const TransactionForm = ({
  handleClose,
  handleImportClick,
  handleSubmit,
  initialValues: {
    account,
  },
}) => (
  <Form onSubmit={handleSubmit}>
    <Input
      format={value => value && `0x${get(value, 'address')}`}
      label="Address"
      name="account"
      readOnly
    />

    <Input
      disabled={!account}
      label="Password"
      name="password"
      type="password"
    />

    <Actions>
      <div className={styles.Actions}>
        {!account && (
          <Button
            className={styles.Import}
            onClick={handleImportClick}
            size={Button.SIZE.LARGE}
            variant={Button.VARIANT.PRIMARY}
          >
            Import Account
          </Button>
        )}

        <div className={styles.ActionsRight}>
          <Button
            onClick={handleClose}
            size={Button.SIZE.LARGE}
            variant={Button.VARIANT.SECONDARY}
          >
            Cancel
          </Button>

          <Button
            disabled={!account}
            size={Button.SIZE.LARGE}
            type="submit"
            variant={Button.VARIANT.SUCCESS}
          >
            Submit
          </Button>
        </div>
      </div>
    </Actions>
  </Form>
);

const mapStateToProps = ({ services }) => ({
  initialValues: {
    account: get(services, 'session.accounts', [])
      .filter(({ address }) => address === get(services, 'session.currentAccount'))[0],
  },
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal('transactionForm')),
  openImportModal: () => dispatch(openModal('importAccount')),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'transactionForm',
    enableReinitialize: true,
    validate: validate({
      account: [required()],
      password: [required()],
    }),
  }),
  withHandlers({
    handleClose: ({ closeModal }) => () =>
      closeModal && closeModal(),
    handleImportClick: ({ openImportModal }) => () =>
      openImportModal && openImportModal(),
  }),
)(TransactionForm);
