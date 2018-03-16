import PropTypes from 'prop-types';
import React from 'react';

import styles from './Item.scss';

const FormMultiSelectItem = ({ onAdd, onRemove, title, value }) => {
  const handleClick = () => {
    onAdd && onAdd(value);
    onRemove && onRemove(value);
  }

  return (
    <div
      className={styles.Root}
      onClick={handleClick}
    >
      <div className={styles.Title}>
        {title}
      </div>

      <div className={styles.Icon}>
        {onAdd ? '+' : '–'}
      </div>
    </div>
  );
};

FormMultiSelectItem.propTypes = {
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  selected: PropTypes.bool,
  title: PropTypes.string,
  value: PropTypes.string,
};

export default FormMultiSelectItem;
