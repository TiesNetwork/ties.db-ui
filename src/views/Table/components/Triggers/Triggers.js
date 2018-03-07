import { get, isEmpty } from 'lodash';
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
import { TRIGGER_FORM_ID } from '../../ducks/types';

/** Utils **/
import tableSettings from '../../utils/tableSettings';

import columns from './utils/columns';
import styles from './Triggers.scss';

const TableIndexes = ({ handleTriggerClick, tableHash, triggers }) => (
  <div className={styles.Root}>
    <div className={styles.Header}>
      <div className={styles.Title}>
        <h3>Triggers</h3>
      </div>

      <div className={styles.Actions}>
        <Button onClick={handleTriggerClick}>
          Add trigger
        </Button>
      </div>
    </div>

    <div className={styles.Container}>
      <Table {...tableSettings}
         columns={columns}
         data={triggers}
      />
    </div>

    <Modal id={TRIGGER_FORM_ID} title="Create a trigger">
      <Form initialValues={{ tableHash }} />
    </Modal>
  </div>
);

const mapStateToProps = ({ entities, router  }, { triggers }) => {
  const pathname = get(router, 'location.pathname');
  const match = matchPath(pathname, '/:tablespaceHash/:tableHash');
  const tableHash = get(match, 'params.tableHash');

  return {
    tableHash,
    triggers: triggers && triggers.map(hash => {
      const trigger = get(entities, `triggers.${hash}`, {});

      return {
        data: {
          tableHash, hash,
          isEmpty: isEmpty(trigger),
        },
        ...trigger,
      }
    })
  };
};

const mapDispatchToProps = dispatch => ({
  handleTriggerClick: () => dispatch(openModal(TRIGGER_FORM_ID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableIndexes);
