import React from 'react';

// Components
import Form from './components/Form';

import styles from './Query.scss';

const Query = () => (
  <div className={styles.Root}>
    <div className={styles.Container}>
      List
    </div>

    <div className={styles.Form}>
      <Form onSubmit={console.log} />
    </div>
  </div>
);

export default Query;