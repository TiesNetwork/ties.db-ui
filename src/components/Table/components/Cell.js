import classNames from 'classnames';
import React from 'react';

import styles from './Cell.scss';

const TableCell = ({ value }) => {
  const className = classNames(styles.Root, {
    [styles.RootEmpty]: !value,
  });

  return (
    <div className={className}>
      {value}
    </div>
  )
}

export default TableCell;
