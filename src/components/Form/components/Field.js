import { uniqueId } from 'lodash';
import PropTypes from 'prop-types';
import React, { cloneElement, Component } from 'react';
import { Field } from 'redux-form';

import reduxFieldAdapter from '../utils/reduxFieldAdapter';
import styles from './Field.scss';

class FormField extends Component {
  state = { id: uniqueId('field_') };

  render() {
    const { children } = this.props;
    const { id } = this.state;

    return (
      <div className={styles.Root}>
        <Field {...this.props} component={reduxFieldAdapter}>
          {props => cloneElement(children, { ...props, id })}
        </Field>
      </div>
    )
  }
}


FormField.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string
};

export default FormField;
