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
import { FIELD_FORM_ID } from '../../ducks/types';

/** Utils **/
import tableAdapter from './utils/tableAdapter';
import tableSettings from '../../utils/tableSettings';

import columns from './columns'

import styles from './Fields.scss';

const TableFields = ({ fields, handleTriggerClick, tableHash }) => (
  <div className={styles.Root}>
    <div className={styles.Header}>
      <div className={styles.Title}>
        <h3>Fields</h3>
      </div>

      <div className={styles.Actions}>
        <Button onClick={handleTriggerClick}>
          Add field
        </Button>
      </div>
    </div>

    <div className={styles.Container}>
      <Table {...tableSettings}
        columns={columns}
        data={fields}
      />
    </div>

    <Modal
      id={FIELD_FORM_ID}
      title="Create a field"
    >
      <Form initialValues={{ defaultValue: 0, tableId: tableHash }}/>
    </Modal>
  </div>
);

const mapStateToProps = ({ entities, router  }, { fields }) => {
  const pathname = get(router, 'location.pathname');
  const match = matchPath(pathname, '/:tablespaceHash/:tableHash');
  const tableHash = get(match, 'params.tableHash');

  return {
    tableHash,
    fields: fields && fields.map(hash => tableAdapter({
      tableHash, hash,
      ...get(entities, `fields.${hash}`, {}),
    })),
  };
};

const mapDispatchToProps = dispatch => ({
  handleTriggerClick: () => dispatch(openModal(FIELD_FORM_ID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableFields);
