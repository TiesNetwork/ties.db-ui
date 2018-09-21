import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { compose, withHandlers } from 'recompose';

// Actions
import { closeModal } from 'services/modals';

// Components
import Button from 'components/Button';
import Form, { Actions, Input } from 'components/Form';

// Utils
import validate, { required } from 'utils/validate';

const PromptForm = ({
  handleClose,
  handleSubmit,
  label,
}) => (
  <Form onSubmit={handleSubmit}>
    <Input label={label} name="password" type="password" />

    <Actions>
      <Button
        onClick={handleClose}
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
        Submit
      </Button>
    </Actions>
  </Form>
);

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal('prompt')),
});

export default compose(
  connect(null, mapDispatchToProps),
  reduxForm({
    form: 'promptForm',
    validate: validate({
      password: [required()],
    }),
  }),
  withHandlers({
    handleClose: ({ closeModal }) => () =>
      closeModal && closeModal(),
  }),
)(PromptForm);
