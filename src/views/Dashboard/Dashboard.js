import { get } from 'lodash';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

/** Components **/
import TablespaceSelector from './components/TablespaceSelector';
import TablespaceTrigger from './components/TablespaceTrigger';

/** Views **/
import Tablespace from '../Tablespace';

import styles from './Dashboard.scss';

const Dashboard = ({ match, tablespaces }) => (
  <div className={styles.Root}>
    <div className={styles.Tablespaces}>
      {tablespaces.map(id => <TablespaceSelector id={id} key={id} />)}

      <TablespaceTrigger />
    </div>

    <div className={styles.Container}>
      <Switch>
        <Route path={`${match.url}:tablespaceId`} component={Tablespace}/>
      </Switch>
    </div>
  </div>
);

const mapStateToProps = state => get(state, 'views.dashboard', {});

export default connect(mapStateToProps)(Dashboard);
