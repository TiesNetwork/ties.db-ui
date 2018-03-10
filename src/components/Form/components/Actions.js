import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Children, cloneElement } from 'react';

import styles from './Actions.scss';

const FormActions = ({ children, className: classNameProp }) => {
  const className = classNames(classNameProp, styles.Root);

  return (
    <div className={className}>
      {Children.map(children, child => child && cloneElement(child, {
        className: classNames(styles.Action, child.props.className)
      }))}
    </div>
  );
};

FormActions.propTypes = {
  children: PropTypes.node,
};

export default FormActions;
