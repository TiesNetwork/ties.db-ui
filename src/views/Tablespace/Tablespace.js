import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

/** Components **/
import TableSelector from './components/TableSelector';

/** Views **/
import Table from '../Table';

import styles from './Tablespace.scss';

const Tablespace = ({ match, name, tables }) => (
  <div className={styles.Root}>
    <div className={styles.Header}>
      <div className={styles.Name}>
        {name}
      </div>

      <div className={styles.Nav}>

      </div>
    </div>

    <div className={styles.Container}>
      <div className={styles.Tables}>
        {tables && tables.length > 0 && (
          <div className={styles.TablesContainer}>
            {tables.map(id => (
              <TableSelector id={id} key={id} />
            ))}
          </div>
        )}
      </div>

      <div className={styles.Content}>
        <Switch>
          <Route path={`${match.url}/:tableId`} component={Table} />
        </Switch>
      </div>
    </div>
  </div>
);

const mapStateToProps = (state, { match }) => {
  console.log(match);
  const id = get(match, 'params.tablespaceId', 0);
  return get(state, `entities.tablespaces.${id}`, {});
};

export default connect(mapStateToProps)(Tablespace);
