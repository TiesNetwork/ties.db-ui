import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

/** Actions **/
import { uploadTable } from './ducks/actions';

/** Components **/
import Button from 'components/Button';

import Fields from './components/Fields';
import Indexes from './components/Indexes';
import Triggers from './components/Triggers';

import styles from './Table.scss';

const Table = ({ fields, handleUploadClick, indexes, name, triggers }) => (
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
  </div>
);

const mapStateToProps = ({ entities }, { match }) => {
  const id = get(match, 'params.tableId');
  return get(entities, `tables.${id}`);
};

const mapDispatchToProps = (dispatch, { match }) => {
  const id = get(match, 'params.tableId');

  return {
    handleUploadClick: () => dispatch(uploadTable(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
