import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Web3 from 'web3';

/** Actions **/
import { closeModal } from 'services/modals';

/** Components **/
import Button from 'components/Button';
import Form, { Actions, Input, Select } from 'components/Form';

/** Types **/
import { FIELD_FORM_ID } from '../ducks/types';

/** Utils **/
import validate, { matches, required } from 'utils/validate';

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

      <Select label="Type" name="type">
        <optgroup label="Primitive">
          <option value="Boolean">Boolean</option>
          <option value="Integer">Integer</option>
          <option value="Long">Long</option>
          <option value="Float">Float</option>
          <option value="Double">Double</option>
          <option value="Decimal">Decimal</option>
          <option value="String">String</option>
          <option value="Binary">Binary</option>
          <option value="Time">Time</option>
          <option value="Duration">Duration</option>
        </optgroup>

        <optgroup label="Collections">
          <option value="List">List</option>
          <option value="Bag">Bag</option>
          <option value="Map">Map</option>
        </optgroup>

        <optgroup label="Compound">
          <option value="Structure">Structure</option>
        </optgroup>
      </Select>

      <Input label="Default value" name="defaultValue" />

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
            Delete field
          </Button>
        ) : (
          <Button
            size={Button.SIZE.LARGE}
            type="submit"
            variant={Button.VARIANT.SUCCESS}
          >
            Create field
          </Button>
        )}
      </Actions>
    </Form>
  );
}

const mapStateToProps = ({ entities, services }, { tableHash }) => {
  const hash = get(services, `modals.${FIELD_FORM_ID}`, {}).hash;
  const initialValues = hash
    ? { ...get(entities, `fields.${hash}`, {}), hash }
    : { defaultValue: '0x00', type: 'Integer' };
  const table = get(entities, `tables.${tableHash}`);

  return {
    initialValues,
    hasField: fieldName =>
      table &&
      table.fields.indexOf(Web3.utils.sha3(fieldName)) > -1,
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleCancelClick: () => dispatch(closeModal(FIELD_FORM_ID))
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: FIELD_FORM_ID,
  validate: validate({
    defaultValue: [
      required(),
      matches(new RegExp('^0x[0-9abcdef]{2,}$')),
    ],
    name: [
      required(),
      (value, { hasField }) => ({
        isValid: value && !hasField(value),
        message: 'Field exists',
      }),
    ],
    type: [required()],
  }),
})(FieldsForm))
