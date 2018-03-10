import { get } from 'lodash';
import React  from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/** Actions **/
import { openModal } from 'services/modals';
import {
  deleteIndex,
  fetchIndex,
} from './ducks/actions';

/** Components **/
import Button from 'components/Button';
import Modal from 'components/Modal';

import Form from './components/Form';
import Index from './components/Item';

/** Types **/
import { INDEXES_FORM_ID } from './ducks/types';

import styles from './Indexes.scss';

const Indexes = ({
  handleClick,
  handleDelete,
  handleFetch,
  handleSubmit,
  indexes,
}) => (
  <div className={styles.Root}>
    <div className={styles.Header}>
      <div className={styles.Title}>
        Indexes
      </div>

      <div className={styles.Actions}>
        <Button
          onClick={handleClick}
          variant={Button.VARIANT.PRIMARY}
        >
          Create index
        </Button>
      </div>
    </div>

    <div className={styles.Container}>
      {indexes && indexes.length > 0 && (
        <div className={styles.Indexes}>
          {indexes.map(hash => (
            <Index
              hash={hash}
              key={hash}
              onFetch={handleFetch}
            />
          ))}
        </div>
      )}
    </div>

    <Modal id={INDEXES_FORM_ID}>
      <Form
        onDelete={handleDelete}
        onSubmit={handleSubmit}
      />
    </Modal>
  </div>
);

const mapStateToProps = ({ entities }, { match }) => {
  const tableHash = get(match, 'params.tableHash', '');

  return {
    indexes: get(entities, `tables.${tableHash}`, {}).indexes,
  };
};

const mapDispatchToProps = (dispatch, { match }) => {
  const tableHash = get(match, 'params.tableHash', '');

  return {
    handleClick: () => dispatch(openModal(INDEXES_FORM_ID, { title: 'Create a index' })),
    handleDelete: hash => dispatch(deleteIndex(tableHash, hash)),
    handleFetch: hash => dispatch(fetchIndex(tableHash, hash)),
    // handleSubmit: values => dispatch(sendFieldForm(tableHash, values)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Indexes));
