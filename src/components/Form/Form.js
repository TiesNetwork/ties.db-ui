import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Form.scss';

const Form = ({ children, className: classNameProp, onSubmit }) => {
  const className = classNames(classNameProp, styles.Root);

  return (
    <form
      className={className}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

Form.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default Form;
