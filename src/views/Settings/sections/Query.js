import React from 'react';
import { connect } from 'react-redux';

// Actions
import { setWS } from 'services/env';

// Components
import Form from '../components/Form';

import styles from './Accounts.scss';

const SettingsQuery = ({
  handleQuerySubmit,
}) => (
  <div className={styles.Root}>
    <div className={styles.Header}>
      <div className={styles.Title}>
        Query settings
      </div>
    </div>

    <div className={styles.Container}>
      <Form onSubmit={handleQuerySubmit} />
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  handleQuerySubmit: ({ ws }) => {
    localStorage.setItem('ws', ws);
    dispatch(setWS(ws));
  },
});

export default connect(null, mapDispatchToProps)(SettingsQuery);
