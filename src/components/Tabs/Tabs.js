import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { Children, cloneElement } from 'react'

import styles from './Tabs.scss'

const Tabs = ({ children, className: classNameProp, onChange, value }) => {
  const className = classNames(classNameProp, styles.Root);

  const handleClick = value => onChange && onChange(value);

  return (
    <div className={className}>
      {Children.map(children, child => cloneElement(child, {
        onClick: handleClick,
        selected: (child.props.value || child.props.label) === value,
      }))}
    </div>
  );
};

Tabs.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default Tabs;
