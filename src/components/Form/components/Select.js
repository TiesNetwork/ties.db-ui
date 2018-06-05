import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import Field from './Field';

import styles from './Select.scss';

const FormSelect = ({
  children,
  disabled,
  error,
  id,
  name,
  onChange,
  readOnly,
  value,
}) => {
  const selectClassName = classNames(styles.Select, {
    [styles.SelectError]: !!error,
    [styles.SelectHasValue]: !!value,
    [styles.SelectReadOnly]: readOnly,
  });

  return (
    <div className={styles.Root}>
      <select
        className={selectClassName}
        disabled={disabled}
        id={id}
        name={name}
        onChange={onChange}
        readOnly={readOnly}
        value={value}
      >
        {children}
      </select>
    </div>
  );
};

FormSelect.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default ({ children, ...props }) => (
  <Field {...props}>
    <FormSelect>
      {children}
    </FormSelect>
  </Field>
);
