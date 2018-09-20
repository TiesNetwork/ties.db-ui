import classNames from 'classnames';
import React from 'react';
import ReactTable from 'react-table';

import 'react-table/react-table.css';
import styles from './Table.scss';

const Table = ({
  className: classNameProp,
  ...props,
}) => {
  const className = classNames(classNameProp, styles.Root);
  const settings = {
    defaultPageSize: 60,
    minRows: 1,
    showPagination: false,
    resizable: false,
  };

  return (
    <div className={className}>
      <ReactTable {...settings} {...props} />
    </div>
  );
};

export default Table;
