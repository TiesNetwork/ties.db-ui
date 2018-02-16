import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Actions.scss';

const FormActions = ({ children, className: classNameProp }) => {
  const className = classNames(classNameProp, styles.Root);

  return (
    <div className={className}>
      {children}
    </div>
  );
};

FormActions.propTypes = {
  children: PropTypes.node,
};

export default FormActions;
