import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

/** Actions **/
import { closeModal } from 'services/modals';
import { sendConfirmForm } from '../ducks/actions';

/** Components **/
import Button from 'components/Button';
import Form, { Actions, Input } from 'components/Form';

/** Types **/
import { CONFIRM_FORM_ID } from '../ducks/types';

/** Utils **/
import validate, { required } from 'utils/validate';

const TableConfirmForm = ({ handleCancelClick, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Input label="Password" name="password" type="password" />
    <Input name="tableId" type="hidden" />

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
        Confirm
      </Button>
    </Actions>
  </Form>
);

const mapDispatchToProps = dispatch => ({
  handleCancelClick: () => dispatch(closeModal(CONFIRM_FORM_ID))
});

export default connect(null, mapDispatchToProps)(reduxForm({
  form: CONFIRM_FORM_ID,
  onSubmit: (values, dispatch) => dispatch(sendConfirmForm(values)),
  validate: validate({
    password: [required()],
  }),
})(TableConfirmForm));
