import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { matchPath } from 'react-router-dom';

/** Actions **/
import { openModal } from '../../../../services/modals';

/** Components **/
import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal';
import Table from '../../../../components/Table/Table';

import Form from './components/Form';

/** Types **/
import { INDEX_FORM_ID } from '../../ducks/types';

/** Utils **/
import tableAdapter from './utils/tableAdapter';
import tableSettings from '../../utils/tableSettings';

import columns from './columns';
import styles from './Indexes.scss';

const TableIndexes = ({ indexes, handleTriggerClick, tableId }) => (
  <div className={styles.Root}>
    <div className={styles.Header}>
      <div className={styles.Title}>
        <h3>Indexes</h3>
      </div>

      <div className={styles.Actions}>
        <Button onClick={handleTriggerClick}>
          Add index
        </Button>
      </div>
    </div>

    <div className={styles.Container}>
      <Table {...tableSettings}
        columns={columns}
        data={indexes}
      />
    </div>

    <Modal id={INDEX_FORM_ID} title="Create a index">
      <Form initialValues={{ tableId: tableId }} />
    </Modal>
  </div>
);

const mapStateToProps = ({ entities, router  }, { indexes }) => {
  const pathname = get(router, 'location.pathname');
  const match = matchPath(pathname, '/:tablespaceId/:tableId');
  const tableId = get(match, 'params.tableId');

  return {
    tableId,
    indexes: indexes && indexes.map(id => tableAdapter(get(entities, `indexes.${id}`))),
  };
};

const mapDispatchToProps = dispatch => ({
  handleTriggerClick: () => dispatch(openModal(INDEX_FORM_ID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableIndexes);