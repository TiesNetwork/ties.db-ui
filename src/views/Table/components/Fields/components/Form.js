import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

/** Actions **/
import { sendFieldForm } from '../../../ducks/actions';
import { closeModal } from '../../../../../services/modals';

/** Components **/
import Button from '../../../../../components/Button';
import Form, { Actions, Input } from '../../../../../components/Form';

/** Types **/
import { FIELD_FORM_ID } from '../../../ducks/types';

/** Utils **/
import validate, { required } from '../../../../../utils/validate';

import styles from './Form.scss';

const FieldsForm = ({ handleCancelClick, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Input
      label="Name"
      name="name"
    />

    <Input
      label="Type"
      name="type"
    />

    <Input
      label="Default"
      name="defaultValue"
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
        Create Field
      </Button>
    </Actions>
  </Form>
);

const mapDispatchToProps = dispatch => ({
  handleCancelClick: () => dispatch(closeModal(FIELD_FORM_ID)),
  handleSubmit: (values) => console.log(values),
});

export default connect(null, mapDispatchToProps)(reduxForm({
  form: FIELD_FORM_ID,
  onSubmit: (values, dispatch) => dispatch(sendFieldForm(values)),
  validate: validate({
    name: [required('Don\' forget to name your field')],
    type: [required('Don\' forget to choose your field type')],
  }),
})(FieldsForm));
