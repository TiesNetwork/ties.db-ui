import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Item.scss';

const FormMultiSelectItem = ({ onClick, selected, title, value }) => {
  const checkClassName = classNames(styles.Check, {
    [styles.CheckSelected]: !!selected
  });

  const handleClick = () => onClick && onClick(value, selected);

  return (
    <div className={styles.Root} onClick={handleClick}>
      <div className={checkClassName} />

      <div className={styles.Title}>
        {title}
      </div>
    </div>
  );
};

FormMultiSelectItem.propTypes = {
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  title: PropTypes.string,
  value: PropTypes.string,
};

export default FormMultiSelectItem;
