import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

/** Actions **/
import { uploadTable } from './ducks/actions';

/** Components **/
import Button from 'components/Button';
import Modal from 'components/Modal';

import ConfirmForm from './components/ConfirmForm';
import Fields from './components/Fields';
import Indexes from './components/Indexes';
import Triggers from './components/Triggers';

/** Types **/
import { CONFIRM_FORM_ID } from './ducks/types';

import styles from './Table.scss';
import {openModal} from "services/modals";

const Table = ({ fields, handleUploadClick, id, indexes, name, triggers }) => (
  <div className={styles.Root}>
    <div className={styles.Header}>
      <div className={styles.Title}>
        {name}
      </div>

      <div className={styles.Upload}>
        <Button
          onClick={handleUploadClick}
          size={Button.SIZE.LARGE}
          variant={Button.VARIANT.SUCCESS}
        >
          Upload to blockchain
        </Button>

        <div className={styles.UploadDate}>
          Last update: 18 hours ago
        </div>
      </div>
    </div>

    <div className={styles.Container}>
      <div className={styles.Section}>
        <Fields fields={fields} />
      </div>

      <div className={styles.Section}>
        <Indexes indexes={indexes} />
      </div>

      <div className={styles.Section}>
        <Triggers triggers={triggers} />
      </div>
    </div>

    <Modal id={CONFIRM_FORM_ID} title="Confirm action">
      <ConfirmForm initialValues={{ tableId: id }}/>
    </Modal>
  </div>
);

const mapStateToProps = ({ entities }, { match }) => {
  const id = get(match, 'params.tableId');
  return get(entities, `tables.${id}`);
};

const mapDispatchToProps = dispatch => ({
  handleUploadClick: () => dispatch(openModal(CONFIRM_FORM_ID))
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
