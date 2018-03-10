import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

/** Actions **/
import { closeModal } from 'services/modals';

/** Components **/
import Button from 'components/Button';
import Form, { Actions, Input } from 'components/Form';

/** Types **/
import { TRIGGER_FORM_ID } from '../ducks/types';

/** Utils **/
import validate, { required } from 'utils/validate';

import styles from './Form.scss';

const TriggersForm = ({
  handleCancelClick,
  handleSubmit,
  initialValues: { hash },
  onDelete,
}) => {
  const handleDeleteClick = () => hash && onDelete && onDelete(hash);

  return (
    <Form onSubmit={handleSubmit}>
      <Input label="Name" name="name" />
      <Input label="Payload" name="payload" />

      <Input name="hash" type="hidden" />

      <Actions className={styles.Actions}>
        {hash && (
          <div>
            <Button
              onClick={handleDeleteClick}
              size={Button.SIZE.LARGE}
              variant={Button.VARIANT.DANGER}
            >
              Delete trigger
            </Button>
          </div>
        )}

        <Button
          onClick={handleCancelClick}
          size={Button.SIZE.LARGE}
          variant={Button.VARIANT.SECONDARY}
        >
          Cancel
        </Button>

        <Button
          className={styles.ActionsSubmit}
          size={Button.SIZE.LARGE}
          type="submit"
          variant={Button.VARIANT.SUCCESS}
        >
          {`${hash ? 'Update' : 'Create'} trigger`}
        </Button>
      </Actions>
    </Form>
  )
}

const mapStateToProps = ({ entities, services }) => {
  const hash = get(services, `modals.${TRIGGER_FORM_ID}`).hash;
  const initialValues = hash && { ...get(entities, `triggers.${hash}`, {}), hash };

  return { initialValues };
};

const mapDispatchToProps = dispatch => ({
  handleCancelClick: () => dispatch(closeModal(TRIGGER_FORM_ID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: TRIGGER_FORM_ID,
  validate: validate({
    name: [required()],
    payload: [required()],
  }),
})(TriggersForm))
