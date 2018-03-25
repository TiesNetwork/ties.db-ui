import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Icon.scss';

const TYPE = {
  CLOSE: 'Close',
  EXTERNAL: 'External',
  SETTINGS: 'Settings',
};

const Icon = ({ className: classNameProp, type }) => {
  const className = classNames(classNameProp, styles.Root, {
    [styles.RootTypeClose]: type === TYPE.CLOSE,
    [styles.RootTypeExternal]: type === TYPE.EXTERNAL,
    [styles.RootTypeSettings]: type === TYPE.SETTINGS,
  });

  return (
    <div className={className} />
  );
};

Icon.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
};

Icon.TYPE = TYPE;

export default Icon;
