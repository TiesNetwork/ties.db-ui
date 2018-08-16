import React from 'react';
import { connect } from 'react-redux';

// Actions
import { setWS } from 'services/env';

// Components
import QueryForm from './components/Form';

import styles from './Settings.scss';

const Settings = ({
  handleQuerySubmit,
}) => (
  <div className={styles.Root}>
    <div className={styles.Container}>
      <div className={styles.Card}>
        <div className={styles.CardTitle}>
          Query settings
        </div>

        <div className={styles.CardContent}>
          <QueryForm onSubmit={handleQuerySubmit} />
        </div>
      </div>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  handleQuerySubmit: ({ ws }) => {
    localStorage.setItem('ws', ws);
    dispatch(setWS(ws));
  },
});

export default connect(null, mapDispatchToProps)(Settings);