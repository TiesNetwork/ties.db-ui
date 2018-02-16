import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import styles from './Tab.scss'

const Tab = ({ className: classNameProp, label, onClick, selected }) => {
  const className = classNames(classNameProp, styles.Root, {
    [styles.RootSelected]: selected,
  });

  return (
    <button
      className={className}
      onClick={onClick}
    >
      {label}
    </button>
  )
};

Tab.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
};

export default Tab;

