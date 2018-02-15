import classNames from 'classnames';
import React from 'react';

import styles from './Name.scss';

const TYPE = {
  EXTERNAL: 'External',
  INTEGER: 'Integer',
  INTERNAL: 'Internal',
  PRIMARY: 'Primary',
  STRING: 'String',
};

const TableFieldName = ({ name, type }) => {
  const iconClassName = classNames(styles.Icon, {
    [styles.IconExternal]: type === TYPE.EXTERNAL,
    [styles.IconInteger]: type === TYPE.INTEGER,
    [styles.IconInternal]: type === TYPE.INTERNAL,
    [styles.IconPrimary]: type === TYPE.PRIMARY,
    [styles.IconString]: type === TYPE.STRING,
  });

  return (
    <div className={styles.Root}>
      <div className={iconClassName}>
        {type.substr(0, 1)}
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

TableFieldName.TYPE = TYPE;

export default TableFieldName;
