import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

/** Actions **/
import { sendTableForm } from '../ducks/actions';
import { closeModal } from 'services/modals';

/** Components **/
import Button from 'components/Button';
import Form, { Actions, Input } from 'components/Form';

/** Types **/
import { TABLE_FORM_ID } from '../ducks/types';

/** Utils **/
import validate, { required } from 'utils/validate';

import styles from './TableForm.scss';

const TableForm = ({ handleCancelClick, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Input label="Name" name="name" />
    <Input name="tablespaceId" type="hidden" />

    <Actions className={styles.Actions}>
      <Button
        onClick={handleCancelClick}
        size={Button.SIZE.LARGE}
        variant={Button.VARIANT.SECONDARY}
      >
        Cancel
      </Button>

      <Button
        className={styles.Action}
        size={Button.SIZE.LARGE}
        type="submit"
        variant={Button.VARIANT.SUCCESS}
      >
        Create Table
      </Button>
    </Actions>
  </Form>
);

const mapDispatchToProps = dispatch => ({
  handleCancelClick: () => dispatch(closeModal(TABLE_FORM_ID)),
});

export default connect(null, mapDispatchToProps)(reduxForm({
  form: TABLE_FORM_ID,
  onSubmit: (values, dispatch) => dispatch(sendTableForm(values)),
  validate: validate({
    name: [required('Don\' forget to name your table')],
  }),
})(TableForm));
