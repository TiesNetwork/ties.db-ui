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
import { INDEXES_FORM_ID } from '../ducks/types';

/** Utils **/
import validate, { required } from 'utils/validate';

import styles from './Form.scss';

const IndexesForm = ({
  fields,
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

        <div className={styles.ActionsMain}>
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
            {`${hash ? 'Update' : 'Create'} index`}
          </Button>
        </div>
      </Actions>
    </Form>
  );
}


const mapStateToProps = ({ entities, services }) => {
  const hash = get(services, `modals.${INDEXES_FORM_ID}`, {}).hash;
  const { fieldHashes, ...index } = get(entities, `indexes.${hash}`, {});

  const fields = fieldHashes && fieldHashes.map(fieldHash => ({
    hash: fieldHash,
    name: get(entities, `fields.${fieldHash}`, {}).name,
  }));

  const initialValues = hash
    ? { ...index, hash}
    : {};

  return { fields, initialValues };
};

const mapDispatchToProps = (dispatch) => ({
  handleCancelClick: () => dispatch(closeModal(INDEXES_FORM_ID))
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: INDEXES_FORM_ID,
  validate: validate({
    name: [required()],
    type: [required()],
  }),
})(IndexesForm))
