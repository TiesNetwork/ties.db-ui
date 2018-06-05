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
    const { children, readOnly, type } = this.props;
    const { id } = this.state;

    const className = classNames(styles.Root, {
      [styles.RootHidden]: type === 'hidden',
      [styles.RootReadOnly]: !!readOnly,
    });

    return (
      <Field {...this.props} component={reduxFieldAdapter}>
        {({ error, label, info, ...props }) => (
          <div className={className}>
            <label className={styles.Label} htmlFor={id}>
              {label}

              {error && (<span className={styles.Error}>{error}</span>)}
              {readOnly && (<span className={styles.ReadOnly}>READ ONLY</span>)}
            </label>

            <div className={styles.Control}>
              {cloneElement(children, { ...props, error, id })}
            </div>

            {info && (<div className={styles.Info}>{info}</div>)}
          </div>
        )}
      </Field>
    )
  }
}


FormField.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  info: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string
};

export default FormField;
