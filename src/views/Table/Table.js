import classNames from 'classnames';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

/** Views **/
import Fields from 'views/Fields';
import Indexes from 'views/Indexes';
// import Triggers from 'views/Triggers';

import styles from './Table.scss';

const Table = ({ hash, name }) => {
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
        <div className={styles.Fields}>
          <Fields />
        </div>

        <div className={styles.Extra}>
          <div className={styles.Indexes}>
            <Indexes />
          </div>

          <div className={styles.Triggers}>
          </div>
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
