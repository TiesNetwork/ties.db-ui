import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Label.scss';

const VARIANT = {
  DANGER: 'Danger',
  PRIMARY: 'Primary',
  SECONDARY: 'Secondary',
  SUCCESS: 'Success',
};

const Label = ({ children, className: classNameProp, variant = VARIANT.PRIMARY }) => {
  const className = classNames(classNameProp, styles.Root, {
    [styles.RootVariantDanger]: variant === VARIANT.DANGER,
    [styles.RootVariantPrimary]: variant === VARIANT.PRIMARY,
    [styles.RootVariantSecondary]: variant === VARIANT.SECONDARY,
    [styles.RootVariantSuccess]: variant === VARIANT.SUCCESS,
  });

  return (
    <div className={className}>
      {children}
    </div>
  );
}

Label.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    VARIANT.DANGER,
    VARIANT.PRIMARY,
    VARIANT.SECONDARY,
    VARIANT.SUCCESS,
  ]),
};

Label.VARIANT = VARIANT;

export default Label;
