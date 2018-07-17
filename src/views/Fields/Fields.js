import { get } from 'lodash';
import React  from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/** Actions **/
import { openModal } from 'services/modals';
import {
  createField,
  deleteField,
  fetchField,
} from './ducks/actions';

/** Components **/
import Button from 'components/Button';
import Modal from 'components/Modal';

import Form from './components/Form';
import Field from './components/Item';

/** Entities **/
import {
    getTransactionByLink,
} from 'entities/models/transactions';

/** Types **/
import { FIELD_FORM_ID } from './ducks/types';

import styles from './Fields.scss';

const Fields = ({
  fields,
  handleClick,
  handleDelete,
  handleFetch,
  handleSubmit,
  tableIsDistributed,
  tableIsLoading,
  tableHash,
}) => (
  <div className={styles.Root}>
    <div className={styles.Header}>
      <div className={styles.Title}>
        Fields
      </div>

      <div className={styles.Actions}>
        {!tableIsDistributed && !tableIsLoading && (
          <Button
            onClick={handleClick}
            variant={Button.VARIANT.PRIMARY}
          >
            Create field
          </Button>
        )}
      </div>
    </div>

    <div className={styles.Container}>
      {fields && fields.length > 0 && (
        <div className={styles.Fields}>
          {fields.map(hash => (
            <Field
              hash={hash}
              key={hash}
              onFetch={handleFetch}
              readOnly={tableIsDistributed || tableIsLoading}
            />
          ))}
        </div>
      )}
    </div>

    <Modal id={FIELD_FORM_ID}>
      <Form
        onDelete={handleDelete}
        onSubmit={handleSubmit}
        tableHash={tableHash}
      />
    </Modal>
  </div>
);

const mapStateToProps = ({ entities }, { match }) => {
  const tableHash = get(match, 'params.tableHash', '');
  const table = get(entities, `tables.${tableHash}`, {});
  const tableIsDistributed = table.distributed;
  const tableIsLoading = !!getTransactionByLink(entities, `tables.${tableHash}`);

  return {
    tableIsDistributed, tableIsLoading, tableHash,
    fields: table.fields,
  };
};

const mapDispatchToProps = (dispatch, { match }) => {
  const tableHash = get(match, 'params.tableHash', '');

  return {
    handleClick: () => dispatch(openModal(FIELD_FORM_ID, { title: 'Create a field' })),
    handleDelete: hash => dispatch(deleteField(tableHash, hash)),
    handleFetch: hash => dispatch(fetchField(tableHash, hash)),
    handleSubmit: values => dispatch(createField(tableHash, values)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Fields));
