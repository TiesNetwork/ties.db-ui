import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import Field from './Field';

import styles from './Textarea.scss';

const FormTextarea = ({
  disabled,
  error,
  id,
  name,
  onChange,
  placeholder,
  readOnly,
  value,
}) => {
  const inputClassName = classNames(styles.Textarea, {
    [styles.TextareaError]: !!error,
    [styles.TextareaHasValue]: !!value,
    [styles.TextareatReadOnly]: !!readOnly,
  });

  return (
    <div className={styles.Root}>
      <textarea
        className={inputClassName}
        disabled={disabled}
        id={id}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        value={value}
      />
    </div>
  );
};

FormTextarea.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default props => (
  <Field {...props}>
    <FormTextarea />
  </Field>
);
