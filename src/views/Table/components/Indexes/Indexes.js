import React from 'react';

import Button from '../../../../components/Button';
import Table from '../../../../components/Table/Table';

import data from './data';
import columns from './columns'

import styles from './Indexes.scss';

const settings = {
  columns, data,
  minRows: 1,
  resizable: false,
  showPagination: false,
  showPageSizeOptions: false,
};

const TableIndexes = () => (
  <div className={styles.Root}>
    <div className={styles.Header}>
      <div className={styles.Title}>
        <h3>Indexes</h3>
      </div>

      <div className={styles.Actions}>
        <Button>
          Add index
        </Button>
      </div>
    </div>

    <div className={styles.Container}>
      <Table {...settings} />
    </div>
  </div>
);

export default TableIndexes;
