import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

/** Actions **/
import { closeModal } from 'services/modals';

/** Components **/
import Button from 'components/Button';
import Form, { Actions, Input, MultiSelect, MultiSelectItem, Select } from 'components/Form';

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

      <Select label="Type" name="type">
        <option value="0x1">Primary</option>
        <option value="0x2">Internal</option>
        <option value="0x4">External</option>
      </Select>

      <MultiSelect label="Fields" name="fields">
        {fields && fields.length > 0 && fields.map(({ hash, name }) => (
          <MultiSelectItem
            key={hash}
            title={name || hash}
            value={hash}
          />
        ))}
      </MultiSelect>

      <Input name="hash" type="hidden" />

      <Actions className={styles.Actions}>
        {hash && (
          <div>
            <Button
              onClick={handleDeleteClick}
              size={Button.SIZE.LARGE}
              variant={Button.VARIANT.DANGER}
            >
              Delete index
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


const mapStateToProps = ({ entities, services }, { tableHash }) => {
  const hash = get(services, `modals.${INDEXES_FORM_ID}`, {}).hash;
  const index = get(entities, `indexes.${hash}`, {});

  const fieldHashes = get(entities, `tables.${tableHash}`, {}).fields;
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
