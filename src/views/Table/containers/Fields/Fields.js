import React from 'react';

import Button from '../../../../components/Button';
import Table from '../../../../components/Table';

import data from './data';
import columns from './columns'

import styles from './Fields.scss';

const settings = {
  columns, data,
  minRows: 1,
  resizable: false,
  showPagination: false,
  showPageSizeOptions: false,
};

const TableFields = () => (
  <div className={styles.Root}>
    <div className={styles.Header}>
      <div className={styles.Title}>
        <h3>Fields</h3>
      </div>

      <div className={styles.Actions}>
        <Button>
          Add field
        </Button>
      </div>
    </div>

    <div className={styles.Container}>
      <Table {...settings} />
    </div>
  </div>
);

export default TableFields;
