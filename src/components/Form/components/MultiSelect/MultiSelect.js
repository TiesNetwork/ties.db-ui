import PropTypes from 'prop-types';
import React,  { Children, cloneElement } from 'react'

import Field from '../Field';

import styles from './MultiSelect.scss';

const FormMultiSelect = ({
  children,
  onChange,
  value: values,
}) => {
  const handleClick = (itemValue, isSelected) =>
    onChange && onChange(
      isSelected
        ? values.filter(value => value !== itemValue)
        : [...values, itemValue]
    );

  return (
    <div className={styles.Root}>
      <div className={styles.Container}>
        {Children.map(children, child => cloneElement(child, {
          onClick: handleClick,
          selected: values.indexOf(child.props.value) > -1,
        }))}
      </div>
    </div>
  );
};

FormMultiSelect.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
  value: PropTypes.array,
};

export default ({ children, ...props }) => (
  <Field {...props}>
    <FormMultiSelect>
      {children}
    </FormMultiSelect>
  </Field>
);
