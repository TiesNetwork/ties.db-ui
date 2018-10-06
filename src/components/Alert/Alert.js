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
  onClose,
  title,
  variant = VARIANT.DANGER,
}) => {
  const className = classNames(classNameProp, styles.Root, variant.className);

  return (
    <div className={className}>
      <div className={styles.Icon} />

      <div className={styles.Content}>
        {title && <strong>{title}</strong>}&nbsp;
        {children}
      </div>

      {onClose && (
        <button className={styles.Close} onClick={onClose} />
      )}
    </div>
  );
};

Alert.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string,
  variant: PropTypes.shape({
    className: PropTypes.string,
  }),
};

Alert.VARIANT = VARIANT;

export default Alert;
