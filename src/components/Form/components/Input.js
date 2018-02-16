import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import Field from './Field';

import styles from './Input.scss';

const FormInput = ({
  disabled,
  error,
  id,
  info,
  label,
  name,
  onChange,
  placeholder,
  type,
  value,
}) => {
  const inputClassName = classNames(styles.Input, {
    [styles.InputError]: !!error,
  });

  return (
    <div className={styles.Root}>
      <label
        className={styles.Label}
        htmlFor={id}
      >
        {label}

        {error && (
          <span className={styles.Error}>
          {error}
        </span>
        )}
      </label>

      <input
        className={inputClassName}
        disabled={disabled}
        id={id}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />

      {info && (
        <div className={styles.Info}>
          {info}
        </div>
      )}
    </div>
  );
};

FormInput.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  info: PropTypes.string,
  label: PropTypes.string,
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
