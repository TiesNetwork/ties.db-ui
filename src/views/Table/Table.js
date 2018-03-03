import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

/** Components **/
import Fields from './components/Fields';
import Indexes from './components/Indexes';
import Triggers from './components/Triggers';

import styles from './Table.scss';

const Table = ({ fields, indexes, name, triggers }) => (
  <div className={styles.Root}>
    <div className={styles.Header}>
      <div className={styles.Title}>
        {name}
      </div>
    </div>

    <div className={styles.Container}>

    </div>
  </div>
);

const mapStateToProps = ({ entities }, { match }) => {
  const hash = get(match, 'params.tableHash');
  return get(entities, `tables.${hash}`);
};

export default connect(mapStateToProps)(Table);

{/*<div className={styles.Section}>*/}
  {/*<Fields fields={fields} />*/}
{/*</div>*/}

{/*<div className={styles.Section}>*/}
{/*<Indexes indexes={indexes} />*/}
{/*</div>*/}

{/*<div className={styles.Section}>*/}
  {/*<Triggers triggers={triggers} />*/}
  {/*</div>*/}
