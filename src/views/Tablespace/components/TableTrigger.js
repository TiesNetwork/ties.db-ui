import React from 'react';

import Button from '../../../components/Button';

import styles from './TableTrigger.scss';

const TableTrigger = () => (
  <Button
    className={styles.Root}
    size={Button.SIZE.LARGE}
  >
    Create Table
  </Button>
);

export default TableTrigger;
