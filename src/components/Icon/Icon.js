import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Icon.scss';

const TYPE = {
  CLOSE: 'Close',
};

const Icon = ({ className: classNameProp, type }) => {
  const className = classNames(classNameProp, styles.Root, {
    [styles.RootTypeClose]: type === TYPE.CLOSE,
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
