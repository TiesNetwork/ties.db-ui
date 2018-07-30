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
import validate, { min, required } from 'utils/validate';

import styles from './TableDistributeForm.scss';

const TableDistributeForm = ({
  canDistribute,
  handleCancelClick,
  handleSubmit,
  initialValues: { hash },
}) => (
  <Form onSubmit={handleSubmit}>
    {!canDistribute && (
      <div className={styles.Error}>
        <strong>Table must contain:</strong>
        <br />
        - One or more fields<br />
        - Primary index
      </div>
    )}

    <Input label="Ranges" min="1" name="nodes" type="number" />
    <Input label="Replicas" min="3" name="replicas" type="number" />
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
          disabled={!canDistribute}
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
  const table = get(entities, `tables.${hash}`);
  let hasField, hasPrimary;

  if (table) {
    hasField = table.fields.length > 0;

    table.indexes.forEach(hash => {
      const index = get(entities, `indexes.${hash}`);

      if (index && index.type === '1' && !hasPrimary) {
        hasPrimary = true;
      }
    });
  }

  return { 
    canDistribute: hasField && hasPrimary,
    initialValues: { hash }
  };
}

const mapDispatchToProps = dispatch => ({
  handleCancelClick: () => dispatch(closeModal(TABLE_DISTRIBUTE_FORM_ID)),
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: TABLE_DISTRIBUTE_FORM_ID,
  validate: validate({
    nodes: [required(), min(1)],
    replicas: [required(), min(3)],
  }),
})(TableDistributeForm));
