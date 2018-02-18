import React from 'react';
import { Route } from 'react-router-dom'

/** Views **/
import Dashboard from './views/Dashboard';

import styles from './App.scss'
import 'react-table/react-table.css'

const App = () => (
  <div className={styles.Root}>
    <div className={styles.Header}>
      <div className={styles.Logo}>
        <div className={styles.Title}>
          Ties.DB
        </div>

        <div className={styles.SubTitle}>
          Schema Designer
        </div>
      </div>
    </div>

    <div className={styles.Container}>
      <Route path="/" component={Dashboard} />
    </div>
  </div>
);

export default App;

