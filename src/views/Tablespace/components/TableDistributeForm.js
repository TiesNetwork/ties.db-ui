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
import { TABLE_DISTRIBUTE_FORM_ID } from '../ducks/types';

/** Utils **/
import validate, { required } from 'utils/validate';

const TableDistributeForm = ({
  handleCancelClick,
  handleSubmit,
  initialValues: { hash },
}) => (
  <Form onSubmit={handleSubmit}>
    <Input label="Nodes" min="1" name="nodes" type="number" />
    <Input label="Replicas" min="1" name="replicas" type="number" />
    <Input name="hash" type="hidden" />

    <Actions>
      <Button
        onClick={handleCancelClick}
        size={Button.SIZE.LARGE}
        variant={Button.VARIANT.SECONDARY}
      >
        Cancel
      </Button>

      {hash && (
        <Button
          size={Button.SIZE.LARGE}
          type="submit"
          variant={Button.VARIANT.SUCCESS}
        >
          Distribute table
        </Button>
      )}
    </Actions>
  </Form>
)

const mapStateToProps = ({ entities, services }, { tablespaceHash }) => {
  const hash = get(services, `modals.${TABLE_DISTRIBUTE_FORM_ID}`, {}).hash;
  return { initialValues: { hash }};
}

const mapDispatchToProps = dispatch => ({
  handleCancelClick: () => dispatch(closeModal(TABLE_DISTRIBUTE_FORM_ID)),
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: TABLE_DISTRIBUTE_FORM_ID,
  validate: validate({
    nodes: [required()],
    replicas: [required()],
  }),
})(TableDistributeForm));
