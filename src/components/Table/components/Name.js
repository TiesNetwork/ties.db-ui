import classNames from 'classnames';
import React from 'react';

import styles from './Name.scss';

const TYPE = {
  EXTERNAL: 'external',
  INTEGER: 'integer',
  INTERNAL: 'internal',
  PRIMARY: 'primary',
  STRING: 'string',
};

const TableName = ({ name, type }) => {
  const className = classNames(styles.Root, {
    [styles.RootEmpty]: !name,
  });

  const iconClassName = classNames(styles.Icon, {
    [styles.IconExternal]: type === TYPE.EXTERNAL,
    [styles.IconInteger]: type === TYPE.INTEGER,
    [styles.IconInternal]: type === TYPE.INTERNAL,
    [styles.IconPrimary]: type === TYPE.PRIMARY,
    [styles.IconString]: type === TYPE.STRING,
  });

  return (
    <div className={className}>
      <div className={iconClassName}>
        {type && type.substr(0, 1)}
      </div>

      <div className={styles.Info}>
        <div className={styles.Name}>
          {name}
        </div>

        <div className={styles.Type}>
          {type}
        </div>
      </div>
    </div>
  )
};

TableName.TYPE = TYPE;

export default TableName;
