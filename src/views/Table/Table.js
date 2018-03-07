import classNames from 'classnames';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

/** Components **/
import Fields from './components/Fields';
import Indexes from './components/Indexes';
import Triggers from './components/Triggers';

import styles from './Table.scss';

const Table = ({ fields, hash, indexes, name, triggers }) => {
  const className = classNames(styles.Root, {
    [styles.RootEmpty]: !name,
  });

  return (
    <div className={className}>
      <div className={styles.Header}>
        <div className={styles.Name}>
          {name}
        </div>
      </div>

      <div className={styles.Container}>
        <div className={styles.Section}>
          <Fields
            fields={fields}
            key={`${hash}-fields`}
          />
        </div>

        <div className={styles.Section}>
          <Indexes
            indexes={indexes}
            key={`${hash}-indexes`}
          />
        </div>

        <div className={styles.Section}>
          <Triggers
            key={`${hash}-triggers`}
            triggers={triggers}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ entities }, { match }) => {
  const hash = get(match, 'params.tableHash');
  return { hash, ...get(entities, `tables.${hash}`)};
};

export default connect(mapStateToProps)(Table);
