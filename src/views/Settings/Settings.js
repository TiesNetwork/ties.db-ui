import React from 'react';

// Sections
import Accounts from './sections/Accounts';
import Query from './sections/Query';

import styles from './Settings.scss';

const Settings = ({
  handleQuerySubmit,
}) => (
  <div className={styles.Root}>
    <div className={styles.Container}>
      <Accounts />
      <Query />
    </div>
  </div>
);

export default Settings;
