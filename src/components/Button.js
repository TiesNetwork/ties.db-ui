import React from 'react';

import styles from './Button.scss';

const Button = (props) => {
  const { children } = props;

  return (
    <button {...props} className={styles.Root}>
      {children}
    </button>
  );
};

export default Button;
