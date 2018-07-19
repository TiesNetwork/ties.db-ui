import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Web3 from 'web3';

/** Actions **/
import { closeModal } from 'services/modals';

/** Components **/
import Alert from 'components/Alert';
import Button from 'components/Button';
import Form, { Actions, Input, Select } from 'components/Form';

/** Types **/
import { FIELD_FORM_ID } from '../ducks/types';

/** Utils **/
import validate, { matches, required } from 'utils/validate';

const FieldsForm = ({
  error,
  handleCancelClick,
  handleSubmit,
  initialValues: { hash },
  onDelete,
  tableIsDistributed,
}) => {
  const handleDeleteClick = () => hash && onDelete && onDelete(hash);

  return (
    <Form
      error={error}
      onSubmit={handleSubmit}
    >
      {tableIsDistributed && (
        <Alert variant={Alert.VARIANT.WARNING}>
          <p>
            <strong>Attention!</strong> The table is already distributed and live on the network. <br />
            You can not delete fields, so please be very careful creating new fields.
          </p>
          
          <p>
            Once you create this field it cannot be deleted or modified. Are you sure?
          </p>
        </Alert>
      )}

      <Input label="Name" name="name" readOnly={hash} />

      <Select label="Type" name="type" readOnly={hash}>
        <optgroup label="Primitive">
          <option value="Boolean">Boolean</option>
          <option value="Integer">Integer</option>
          <option value="BigInt">BigInt</option>
          <option value="Long">Long</option>
          <option value="Float">Float</option>
          <option value="Double">Double</option>
          <option value="Decimal">Decimal</option>
          <option value="String">String</option>
          <option value="Binary">Binary</option>
          <option value="Time">Time</option>
          <option value="Duration">Duration</option>
          <option value="Uuid">Uuid</option>
        </optgroup>

        <optgroup label="Collections">
          <option disabled value="List">List</option>
          <option disabled value="Bag">Bag</option>
          <option disabled value="Map">Map</option>
        </optgroup>

        <optgroup label="Compound">
          <option disabled value="Structure">Structure</option>
        </optgroup>
      </Select>

      <Input label="Default value" name="defaultValue" readOnly={hash} />
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
    tableIsDistributed: table.distributed,
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
