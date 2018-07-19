import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './Alert.scss';

const VARIANT = {
  DANGER: {
    className: styles.RootVariantDanger,
    toString: () => 'Danger',
  },
  WARNING: {
    className: styles.RootVariantWarning,
    toString: () => 'Warning',
  }
};

const Alert = ({
  children,
  className: classNameProp,
  variant = VARIANT.DANGER,
}) => {
  const className = classNames(classNameProp, styles.Root, variant.className);

  return (
    <div className={className}>
      {children}
    </div>
  );
};

Alert.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.shape({
    className: PropTypes.string,
  }),
};

Alert.VARIANT = VARIANT;

export default Alert;