import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Web3 from 'web3';

/** Actions **/
import { closeModal, openModal } from 'services/modals';

/** Components **/
import Button from 'components/Button';
import Form, { Actions, Input } from 'components/Form';

/** Types **/
import {
  TABLE_FORM_ID,
  TABLE_DISTRIBUTE_FORM_ID,
} from '../ducks/types';

/** Utils **/
import validate, { required } from 'utils/validate';

import styles from './TableForm.scss';

const TableForm = ({
  handleCancelClick,
  handleDeleteClick,
  handleDistributeClick,
  handleSubmit,
  initialValues: { hash },
}) => (
  <Form onSubmit={handleSubmit}>
    <Input label="Name" name="name" readOnly={!!hash} />
    <Input name="tablespaceId" type="hidden" />

    <Actions className={styles.Actions}>
      <div>
        {hash && (
          <Button
            onClick={() => handleDistributeClick(hash)}
            size={Button.SIZE.LARGE}
            variant={Button.VARIANT.SUCCESS}
          >
            Distribute
          </Button>
        )}
      </div>

      <div className={styles.ActionsMain}>
        <Button
          onClick={handleCancelClick}
          size={Button.SIZE.LARGE}
          variant={Button.VARIANT.SECONDARY}
        >
          Cancel
        </Button>

        {hash ? (
          <Button
            className={styles.ActionsSubmit}
            onClick={() => handleDeleteClick(hash)}
            size={Button.SIZE.LARGE}
            variant={Button.VARIANT.DANGER}
          >
            Delete table
          </Button>
        ) : (
          <Button
            className={styles.ActionsSubmit}
            size={Button.SIZE.LARGE}
            type="submit"
            variant={Button.VARIANT.SUCCESS}
          >
            Create table
          </Button>
        )}
      </div>
    </Actions>
  </Form>
)

const mapStateToProps = ({ entities, services }, { tablespaceHash }) => {
  const hash = get(services, `modals.${TABLE_FORM_ID}`, {}).hash;
  const initialValues = hash
    ? { ...get(entities, `tables.${hash}`, {}), hash }
    : {};
  const tablespace = get(entities, `tablespaces.${tablespaceHash}`);
  console.log(get(entities, `tables.${hash}`));
  return {
    initialValues,
    hasTable: tableName =>
      tablespace &&
      tablespace.tables.indexOf(Web3.utils.sha3(`${tablespace.name}#${tableName}`)) > -1,
  };
};

const mapDispatchToProps = (dispatch, { onDelete }) => ({
  handleCancelClick: () => dispatch(closeModal(TABLE_FORM_ID)),
  handleDeleteClick: hash => onDelete && onDelete(hash),
  handleDistributeClick: hash => {
    dispatch(closeModal(TABLE_FORM_ID));
    dispatch(openModal(TABLE_DISTRIBUTE_FORM_ID, { hash }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: TABLE_FORM_ID,
  validate: validate({
    name: [
      required(),
      (value, { hasTable }) => ({
        isValid: value && !hasTable(value),
        message: 'Table exists',
      }),
    ],
  }),
})(TableForm));
