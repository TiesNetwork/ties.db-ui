import React from 'react';

import Fields from './containers/Fields';
import Indexes from './containers/Indexes';
import Triggers from './containers/Triggers';

import styles from './Table.scss';

const Table = () => (
  <div className={styles.Root}>
    <div className={styles.Header}>
      <div className={styles.Title}>
        Messages
      </div>
    </div>

    <div className={styles.Container}>
      <div className={styles.Table}>
        <Fields />
      </div>

      <div className={styles.Table}>
        <Indexes />
      </div>

      <div className={styles.Table}>
        <Triggers />
      </div>
    </div>
  </div>
);

export default Table;
