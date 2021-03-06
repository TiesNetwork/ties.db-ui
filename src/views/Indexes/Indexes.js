import { get } from 'lodash';
import React  from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/** Actions **/
import { openModal } from 'services/modals';
import {
  createIndex,
  deleteIndex,
  fetchIndex,
} from './ducks/actions';

/** Components **/
import Button from 'components/Button';
import Modal from 'components/Modal';

import Form from './components/Form';
import Index from './components/Item';

/** Entities **/
import {
    getTransactionByLink,
} from 'entities/models/transactions';

/** Types **/
import { INDEXES_FORM_ID } from './ducks/types';

import styles from './Indexes.scss';

const Indexes = ({
  handleClick,
  handleDelete,
  handleFetch,
  handleSubmit,
  indexes,
  tableHash,
  tableIsDistributed,
  tableIsLoading,
}) => (
  <div className={styles.Root}>
    <div className={styles.Header}>
      <div className={styles.Title}>
        Indexes
      </div>

      <div className={styles.Actions}>
        {!tableIsLoading && (
          <Button
            onClick={handleClick}
            variant={Button.VARIANT.PRIMARY}
          >
            Create index
          </Button>
        )}
      </div>
    </div>

    <div className={styles.Container}>
      {indexes && indexes.length > 0 && (
        <div className={styles.Indexes}>
          {indexes.map(({ hash, type }) => (
            <Index
              hash={hash}
              key={hash}
              onFetch={handleFetch}
              readOnly={(tableIsDistributed && type === '1') || tableIsLoading}
            />
          ))}
        </div>
      )}
    </div>

    <Modal id={INDEXES_FORM_ID}>
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
    tableIsDistributed, tableHash, tableIsLoading,
    indexes: (table.indexes || []).map(hash => ({
      hash, 
      type: get(entities, `indexes.${hash}`, {}).type
    })),
  };
};

const mapDispatchToProps = (dispatch, { match }) => {
  const tableHash = get(match, 'params.tableHash', '');

  return {
    handleClick: () => dispatch(openModal(INDEXES_FORM_ID, { title: 'Create a index' })),
    handleDelete: hash => dispatch(deleteIndex(tableHash, hash)),
    handleFetch: hash => dispatch(fetchIndex(tableHash, hash)),
    handleSubmit: values => dispatch(createIndex(tableHash, values)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Indexes));
