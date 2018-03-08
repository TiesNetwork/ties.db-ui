import { get } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

/** Components **/
import Field from 'components/../Fields/components/Field';

import styles from './Triggers.scss';

class Triggers extends Component {
  render() {
    const { triggers } = this.props;

    return (
      <div className={styles.Root}>
        <div className={styles.Header}>
          <div className={styles.Title}>
            Triggers
          </div>
        </div>

        <div className={styles.Container}>
          {triggers && triggers.length > 0 && (
            <div className={styles.Fields}>
              {triggers.map(field => <Field {...field} className={styles.Field} key={field.hash} />)}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ entities, router }, { items = [] }) => {
  return {
    triggers: items.map(fieldHash => get(entities, `triggers.${fieldHash}`, {  })),
  };
}

export default connect(mapStateToProps)(Triggers);
