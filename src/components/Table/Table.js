import React from 'react';
import ReactTable from 'react-table';

import styles from './Table.scss';

const Table = (props) => (
  <div className={styles.Root}>
    <ReactTable {...props} />
  </div>
);

export default Table;
