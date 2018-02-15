import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Router, Switch } from 'react-router-dom';

/** Components **/
import TableSelector from './components/TableSelector';

/** Views **/
import Table from '../Table';

import styles from './Tablespace.scss';

const Tablespace = ({ match, tables }) => (
  <div className={styles.Root}>
    {tables && tables.length > 0 && (
      <div className={styles.Tables}>
        {tables && tables.length > 0 && tables.map(id => (
          <TableSelector id={id} key={id} />
        ))}
      </div>
    )}

    <div className={styles.Container}>
      <Switch>
        <Router path={`${match.url}:tableId`} component={Table} />
      </Switch>
    </div>
  </div>
);

const mapStateToProps = (state, { match }) => {
  const id = get(match, 'params.tablespaceId', 0);
  return get(state, `entities.tablespaces.${id}`, {});
};

export default connect(mapStateToProps)(Tablespace);
