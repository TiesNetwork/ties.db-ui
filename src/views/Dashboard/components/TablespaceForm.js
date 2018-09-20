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
import { TABLESPACE_FORM_ID } from '../ducks/types';

/** Utils **/
import validate, { required } from 'utils/validate';

const TablespaceForm = ({
  handleCancelClick,
  handleSubmit,
  initialValues: { hash },
  onDelete,
}) => {
  const handleDeleteClick = () => hash && onDelete && onDelete(hash);

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        info="Names must be lowercase, bla-bla-bla"
        label="Name"
        name="name"
        readOnly={!!hash}
      />

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
            Delete tablespace
          </Button>
        ) : (
          <Button
            size={Button.SIZE.LARGE}
            type="submit"
            variant={Button.VARIANT.SUCCESS}
          >
            Create tablespace
          </Button>
        )}
      </Actions>
    </Form>
  );
};

const mapStateToProps = ({ entities, services }) => {
  const hash = get(services, `modals.${TABLESPACE_FORM_ID}`, {}).hash;
  const initialValues = hash
    ? { ...get(entities, `tablespaces.${hash}`), hash }
    : {};

  return {
    initialValues,
    hasTablespace: tablespaceName =>
      get(entities, `tablespaces.${Web3.utils.sha3(tablespaceName)}`), // eslint-disable-line
  };
};

const mapDispatchToProps = dispatch => ({
  handleCancelClick: () => dispatch(closeModal(TABLESPACE_FORM_ID))
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: TABLESPACE_FORM_ID,
  validate: validate({
    name: [
      required('Don\' forget to name your tablespace'),
      (value, { hasTablespace }) => ({
        isValid: value && !hasTablespace(value),
        message: 'Tablespace exists',
      }),
    ],
  }),
})(TablespaceForm));
