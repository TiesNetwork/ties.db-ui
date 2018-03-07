import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

/** Actions **/
import { closeModal } from '../../../services/modals';
import { sendTablespaceForm } from '../ducks/actions';

/** Components **/
import Button from '../../../components/Button';
import Form, { Actions, Input } from '../../../components/Form';

/** Types **/
import { TABLESPACE_FORM_ID } from '../ducks/types';

/** Utils **/
import validate, { required } from '../../../utils/validate';

import styles from './TablespaceForm.scss';

const TablespaceForm = ({ handleCancelClick, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Input
      info="Names must be lowercase, bla-bla-bla"
      label="Name"
      name="name"
    />

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
        Create Tablespace
      </Button>
    </Actions>
  </Form>
);

const mapDispatchToProps = dispatch => ({
  handleCancelClick: () => dispatch(closeModal(TABLESPACE_FORM_ID))
});

export default connect(null, mapDispatchToProps)(reduxForm({
  form: TABLESPACE_FORM_ID,
  onSubmit: (values, dispatch) => dispatch(sendTablespaceForm(values)),
  validate: validate({
    name: [required('Don\' forget to name your tablespace')],
  }),
})(TablespaceForm));
