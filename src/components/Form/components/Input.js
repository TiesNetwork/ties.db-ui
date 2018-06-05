import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import Field from './Field';

import styles from './Input.scss';

const FormInput = ({
  disabled,
  error,
  id,
  min,
  name,
  onChange,
  placeholder,
  readOnly,
  type,
  value,
}) => {
  const inputClassName = classNames(styles.Input, {
    [styles.InputError]: !!error,
    [styles.InputReadOnly]: !!readOnly,
  });

  return (
    <div className={styles.Root}>
      <input
        className={inputClassName}
        disabled={disabled}
        id={id}
        min={min}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        type={type}
        value={value}
      />
    </div>
  );
};

FormInput.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
  ]),
};

FormInput.defaultProps = {
  type: 'text',
};

export default props => (
  <Field {...props}>
    <FormInput />
  </Field>
);
