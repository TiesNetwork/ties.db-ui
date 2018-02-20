import classNames from 'classnames';
import React from 'react';

import styles from './Progress.scss';

const VARIANT = {
  PRIMARY: 'Primary',
  SECONDARY: 'Secondary',
  SUCCESS: 'Success',
};

const Progress = ({ className: classNameProp, variant = VARIANT.SUCCESS }) => {
  const className = classNames(classNameProp, styles.Root, {
    [styles.RootVariantSuccess]: variant === VARIANT.SUCCESS,
  });

  return (
    <div className={className}>
      <div className={styles.Bar} />
    </div>
  );
};

Progress.VARIANT = VARIANT;

export default Progress;
