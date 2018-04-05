import { get } from 'lodash';
import React  from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/** Actions **/
import { openModal } from 'services/modals';
import { createTrigger, deleteTrigger, fetchTrigger } from './ducks/actions';

/** Components **/
import Button from 'components/Button';
import Modal from 'components/Modal';

import Form from './components/Form';
import Trigger from './components/Item';

/** Entities **/
import {
    getTransactionByLink,
} from 'entities/models/transactions';

/** Types **/
import { TRIGGER_FORM_ID } from './ducks/types';

import styles from './Triggers.scss';

const Triggers = ({
  handleClick,
  handleDelete,
  handleFetch,
  handleSubmit,
  tableIsLoading,
  tableHash,
  triggers,
}) => (
  <div className={styles.Root}>
    <div className={styles.Header}>
      <div className={styles.Title}>
        Triggers
      </div>

      <div className={styles.Actions}>
        {!tableIsLoading && (
          <Button
            onClick={handleClick}
            variant={Button.VARIANT.PRIMARY}
          >
            Create trigger
          </Button>
        )}
      </div>
    </div>

    <div className={styles.Container}>
      {triggers && triggers.length > 0 && (
        <div className={styles.Triggers}>
          {triggers.map(hash => (
            <Trigger
              className={styles.Trigger}
              hash={hash}
              key={hash}
              onFetch={handleFetch}
              readOnly={tableIsLoading}
            />
          ))}
        </div>
      )}
    </div>

    <Modal id={TRIGGER_FORM_ID}>
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
  const tableIsLoading = !!getTransactionByLink(entities, `tables.${tableHash}`);

  return {
    tableIsLoading, tableHash,
    triggers: get(entities, `tables.${tableHash}`, {}).triggers,
  };
};

const mapDispatchToProps = (dispatch, { match }) => {
  const tableHash = get(match, 'params.tableHash', '');

  return {
    handleClick: () => dispatch(openModal(TRIGGER_FORM_ID, { title: 'Create a trigger' })),
    handleDelete: hash => dispatch(deleteTrigger(tableHash, hash)),
    handleFetch: hash => dispatch(fetchTrigger(tableHash, hash)),
    handleSubmit: values => dispatch(createTrigger(tableHash, values)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Triggers));
