import { ipcRenderer } from 'electron';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { compose, withHandlers, withState } from 'recompose';

// Actions
import { closeModal } from 'services/modals';
import { addAccount } from 'services/session';

// Components
import Alert from 'components/Alert';
import Button from 'components/Button';
import Form, { Actions, Input } from 'components/Form';

// Utils
import validate, { required } from 'utils/validate';

import styles from './ImportForm.scss';

const ImportForm = ({
  account,
  handleClose,
  handleLoad,
  handleSubmit,
  needAuthorization,
}) => (
  <Form onSubmit={handleSubmit}>
    {needAuthorization && (
      <Alert>
        <strong>Oops!</strong> Log in to account!
      </Alert>
    )}

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
        <Button
          className={styles.Import}
          size={Button.SIZE.LARGE}
          variant={Button.VARIANT.PRIMARY}
        >
          Load JSON

          <input
            className={styles.ImportFile}
            onChange={handleLoad}
            type="file"
          />
        </Button>

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
            Import
          </Button>
        </div>
      </div>
    </Actions>
  </Form>
);

const mapDispatchToProps = dispatch => ({
  addAccount: account => dispatch(addAccount(account)),
  closeModal: () => dispatch(closeModal('importForm')),
});

export default compose(
  connect(null, mapDispatchToProps),
  reduxForm({
    form: 'importForm',
    enableReinitialize: true,
    onSubmit: ({ account, password }, dispatch, { addAccount, closeModal }) => {
      ipcRenderer.send('recover', { account, password });
      ipcRenderer.on('recover', (event, key) => {
        if (key && typeof key === 'string') {
          sessionStorage.setItem('session', JSON.stringify({
            address: account.address,
            privateKey: key,
          }));

          addAccount && addAccount(account);
          closeModal && closeModal();
        }
      });
    },
    validate: validate({
      account: [required()],
      password: [required()],
    }),
  }),
  withState('account', 'setAccount', false),
  withHandlers({
    handleClose: ({ closeModal }) => () =>
      closeModal && closeModal(),
    handleLoad: ({ change, setAccount }) => event => {
      const file = get(event, 'target.files[0]');

      if (file) {
        try {
          const account = JSON.parse(fs.readFileSync(file.path)); // eslint-disable-line

          change && change('account', account);
          setAccount && setAccount(account);
        } catch(e) {}
      }
    },
  }),
)(ImportForm);
