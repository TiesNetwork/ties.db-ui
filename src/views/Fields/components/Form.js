import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

/** Actions **/
import { closeModal } from 'services/modals';

/** Components **/
import Button from 'components/Button';
import Form, { Actions, Input } from 'components/Form';

/** Types **/
import { FIELD_FORM_ID } from '../ducks/types';

/** Utils **/
import validate, { required } from 'utils/validate';

const FieldsForm = ({ handleCancelClick, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Input label="Name" name="name" />
    <Input label="Type" name="type" />
    <Input label="Default value" name="defaultValue" />

    <Input name="tableHash" type="hidden" />

    <Actions>
      <Button
        onClick={handleCancelClick}
        size={Button.SIZE.LARGE}
        variant={Button.VARIANT.SECONDARY}
      >
        Cancel
      </Button>

      <Button
        size={Button.SIZE.LARGE}
        type="submit"
        variant={Button.VARIANT.SUCCESS}
      >
        Create field
      </Button>
    </Actions>
  </Form>
);

const mapDispatchToProps = dispatch => ({
  handleCancelClick: () => dispatch(closeModal(FIELD_FORM_ID)),
});

export default connect(null, mapDispatchToProps)(reduxForm({
  form: FIELD_FORM_ID,
  validate: validate({
    name: [required()],
    type: [required()],
  }),
})(FieldsForm))
