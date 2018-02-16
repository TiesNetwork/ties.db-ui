import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

/** Components **/
import Fields from './components/Fields';
import Indexes from './components/Indexes';
import Triggers from './components/Triggers';

import styles from './Table.scss';

const Table = ({ fields, name }) => (
  <div className={styles.Root}>
    <div className={styles.Header}>
      <div className={styles.Title}>
        {name}
      </div>
    </div>

    <div className={styles.Container}>
      <Fields fields={fields} />
    </div>
  </div>
);

const mapStateToProps = ({ entities }, { match }) => {
  const id = get(match, 'params.tableId');
  return get(entities, `tables.${id}`);
};

export default connect(mapStateToProps)(Table);
