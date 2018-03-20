import { clone } from 'lodash';
import PropTypes from 'prop-types';
import React,  { Children, Component, cloneElement } from 'react'

/** Components **/
import Field from '../Field';

import styles from './MultiSelect.scss';

class FormMultiSelect extends Component {
  state = { isFocused: false }

  handleBlur = () => setTimeout(() => this.setState({ isFocused: false }), 200);
  handleFocus = () => this.setState({ isFocused: true });

  handleAdd = value => {
    const { onChange, value: values } = this.props;
    onChange && onChange([...values, value]);

    this.setState({ isFocused: false });
  }

  handleRemove = value => {
    const { onChange, value: values } = this.props;
    onChange && onChange(values.filter(n => n !== value));

    this.setState({ isFocused: false });
  }

  render() {
    const { children, name, value: values } = this.props;
    const { isFocused } = this.state;

    const Options = [];
    const Values = clone(values || []);

    Children.forEach(children, child => {
      if (child) {
        const childValue = child.props.value;
        const index = values.indexOf(childValue);

        if (index > -1) {
          Values[index] = cloneElement(child, { onRemove: this.handleRemove });
        } else {
          Options.push(cloneElement(child, { onAdd: this.handleAdd }));
        }
      }
    });

    return (
      <div className={styles.Root}>
        <div className={styles.Container}>
          <div className={styles.Values}>
            {Values}
          </div>

          <input
            className={styles.Input}
            name={name}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            type="text"
          />
        </div>

        {isFocused && (
          <div className={styles.Options}>
            {Options}
          </div>
        )}
      </div>
    );
  }
}

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
