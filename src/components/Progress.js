import classNames from 'classnames';
import React from 'react';

import styles from './Progress.scss';

const VARIANT = {
  DANGER: 'Danger',
  PRIMARY: 'Primary',
  SECONDARY: 'Secondary',
  SUCCESS: 'Success',
};

const Progress = ({ className: classNameProp, variant = VARIANT.SUCCESS, value }) => {
  const className = classNames(classNameProp, styles.Root, {
    [styles.RootDeterminate]: value,
    [styles.RootIndeterminate]: !value,

    [styles.RootVariantDanger]: variant === VARIANT.DANGER,
    [styles.RootVariantPrimary]: variant === VARIANT.PRIMARY,
    [styles.RootVariantSecondary]: variant === VARIANT.SECONDARY,
    [styles.RootVariantSuccess]: variant === VARIANT.SUCCESS,
  });

  return (
    <div className={className}>
      <div
        className={styles.Bar}
        style={{
          width: `${Math.max(0, Math.min(100, value))}%`,
        }}
      />
    </div>
  );
};

Progress.VARIANT = VARIANT;

export default Progress;
