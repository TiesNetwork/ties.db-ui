import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Web3 from 'web3';

/** Actions **/
import { closeModal } from 'services/modals';

/** Components **/
import Button from 'components/Button';
import Form, { Actions, Input } from 'components/Form';

/** Types **/
import { TRIGGER_FORM_ID } from '../ducks/types';

/** Utils **/
import validate, { required } from 'utils/validate';

const TriggersForm = ({
  handleCancelClick,
  handleSubmit,
  initialValues: { hash },
  onDelete,
}) => {
  const handleDeleteClick = () => hash && onDelete && onDelete(hash);

  return (
    <Form onSubmit={handleSubmit}>
      <Input label="Name" name="name" readOnly={hash} />
      <Input label="Payload" name="payload" readOnly={hash} />

      <Input name="hash" type="hidden" />

      <Actions>
        <Button
          onClick={handleCancelClick}
          size={Button.SIZE.LARGE}
          variant={Button.VARIANT.SECONDARY}
        >
          Cancel
        </Button>

        {hash ? (
          <Button
            onClick={handleDeleteClick}
            size={Button.SIZE.LARGE}
            variant={Button.VARIANT.DANGER}
          >
            Delete trigger
          </Button>
        ) : (
          <Button
            size={Button.SIZE.LARGE}
            type="submit"
            variant={Button.VARIANT.SUCCESS}
          >
            Create trigger
          </Button>
        )}
      </Actions>
    </Form>
  )
}

const mapStateToProps = ({ entities, services }, { tableHash }) => {
  const hash = get(services, `modals.${TRIGGER_FORM_ID}`).hash;
  const initialValues = hash
    ? { ...get(entities, `triggers.${hash}`, {}), hash }
    : {};
  const table = get(entities, `tables.${tableHash}`);

  return {
    initialValues,
    hasTrigger: triggerName =>
      table &&
      table.triggers.indexOf(Web3.utils.sha3(triggerName)) > -1,
  };
};

const mapDispatchToProps = dispatch => ({
  handleCancelClick: () => dispatch(closeModal(TRIGGER_FORM_ID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: TRIGGER_FORM_ID,
  validate: validate({
    name: [
      required(),
      (value, { hasTrigger }) => ({
        isValid: value && !hasTrigger(value),
        message: 'Trigger exists',
      }),
    ],
    payload: [required()],
  }),
})(TriggersForm))
