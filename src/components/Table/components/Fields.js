import classNames from 'classnames';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import styles from './Fields.scss';

const TableFields = ({ fields }) => {
  return (
    <div className={styles.Root}>
      {fields && fields.length > 0 && fields.map(field => {
        const className = classNames(styles.Field, {
          [styles.FieldEmpty]: !field,
        });

        return (
          <div className={className}>
            <div className={styles.FieldContent}>
              {field}
            </div>
          </div>
        )
      })}
    </div>
  );
};

const mapStateToProps = ({ entities }, { items = [] }) => ({
  fields: items.map(fieldHash => get(entities, `fields.${fieldHash}`, {}).name)
});

export default connect(mapStateToProps)(TableFields);
