import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

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

import columns from './columns'

import styles from './Fields.scss';
import {matchPath} from "react-router-dom";

const settings = {
  columns,
  minRows: 1,
  resizable: false,
  showPagination: false,
  showPageSizeOptions: false,
};

const TableFields = ({ fields, handleTriggerClick, tableId }) => (
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
      <Table {...settings} data={fields} />
    </div>

    <Modal
      id={FIELD_FORM_ID}
      title="Create a field"
    >
      <Form initialValues={{ defaultValue: 0, tableId: tableId }}/>
    </Modal>
  </div>
);

const mapStateToProps = ({ entities, router  }, { fields }) => {
  const pathname = get(router, 'location.pathname');
  const match = matchPath(pathname, '/:tablespaceId/:tableId');
  const tableId = get(match, 'params.tableId');

  return {
    tableId,
    fields: fields && fields.map(id => tableAdapter(get(entities, `fields.${id}`))),
  };
};

const mapDispatchToProps = dispatch => ({
  handleTriggerClick: () => dispatch(openModal(FIELD_FORM_ID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableFields);