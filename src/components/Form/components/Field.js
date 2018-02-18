import classNames from 'classnames';
import { uniqueId } from 'lodash';
import PropTypes from 'prop-types';
import React, { cloneElement, Component } from 'react';
import { Field } from 'redux-form';

import reduxFieldAdapter from '../utils/reduxFieldAdapter';
import styles from './Field.scss';

class FormField extends Component {
  state = { id: uniqueId('field_') };

  render() {
    const { children, type } = this.props;
    const { id } = this.state;

    const className = classNames(styles.Root, {
      [styles.RootHidden]: type === 'hidden',
    });

    return (
      <div className={className}>
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
