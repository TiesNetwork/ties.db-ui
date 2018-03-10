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
import { FIELD_FORM_ID } from '../ducks/types';

/** Utils **/
import validate, { required } from 'utils/validate';

import styles from './Form.scss';

const FieldsForm = ({
  handleCancelClick,
  handleSubmit,
  initialValues: { hash },
  onDelete,
}) => {
  const handleDeleteClick = () => hash && onDelete && onDelete(hash);

  return (
    <Form onSubmit={handleSubmit}>
      <Input label="Name" name="name" />
      <Input label="Type" name="type" />
      <Input label="Default value" name="defaultValue" />

      <Input name="hash" type="hidden" />

      <Actions className={styles.Actions}>
        {hash && (
          <div>
            <Button
              onClick={handleDeleteClick}
              size={Button.SIZE.LARGE}
              variant={Button.VARIANT.DANGER}
            >
              Delete field
            </Button>
          </div>
        )}

        <div>
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
            {`${hash ? 'Update' : 'Create'} field`}
          </Button>
        </div>
      </Actions>
    </Form>
  );
}


const mapStateToProps = ({ entities, services }) => {
  const hash = get(services, `modals.${FIELD_FORM_ID}`).hash;
  const initialValues = hash && { ...get(entities, `fields.${hash}`, {}), hash };

  return { initialValues };
};

const mapDispatchToProps = (dispatch) => ({
  handleCancelClick: () => dispatch(closeModal(FIELD_FORM_ID))
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: FIELD_FORM_ID,
  validate: validate({
    name: [required()],
    type: [required()],
  }),
})(FieldsForm))
