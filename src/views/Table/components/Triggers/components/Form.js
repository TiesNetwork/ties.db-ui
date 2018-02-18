import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

/** Actions **/
import { sendTriggerForm } from '../../../ducks/actions';
import { closeModal } from '../../../../../services/modals';

/** Components **/
import Button from '../../../../../components/Button';
import Form, { Actions, Input } from '../../../../../components/Form';

/** Types **/
import { TRIGGER_FORM_ID } from '../../../ducks/types';

/** Utils **/
import validate, { required } from '../../../../../utils/validate';

import styles from './Form.scss';

const IndexesForm = ({ handleCancelClick, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Input
      label="Name"
      name="name"
    />

    <Input
      label="Payload"
      name="payload"
    />

    <Input
      name="tableId"
      type="hidden"
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
        Create Index
      </Button>
    </Actions>
  </Form>
);

const mapDispatchToProps = dispatch => ({
  handleCancelClick: () => dispatch(closeModal(TRIGGER_FORM_ID)),
});

export default connect(null, mapDispatchToProps)(reduxForm({
  form: TRIGGER_FORM_ID,
  onSubmit: (values, dispatch) => dispatch(sendTriggerForm(values)),
  validate: validate({
    name: [required('Don\' forget to name your trigger')],
    payload: [required('Don\' forget to set payload your trigger')],
  }),
})(IndexesForm));
