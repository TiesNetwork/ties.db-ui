import { get } from 'lodash';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

/** Components **/
import Modal from 'components/Modal';

import ConfirmForm from './components/ConfirmForm';
import TablespaceForm from './components/TablespaceForm';
import TablespaceSelector from './components/TablespaceSelector';
import TablespaceTrigger from './components/TablespaceTrigger';

/** Types **/
import {
  CONFIRM_FORM_ID,
  TABLESPACE_FORM_ID
} from './ducks/types';

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

    <Modal
      description="Tablespace where you create the tables"
      id={TABLESPACE_FORM_ID}
      title="Create a tablespace"
    >
      <TablespaceForm />
    </Modal>

    <Modal
      id={CONFIRM_FORM_ID}
      title="Confirm action"
    >
      <ConfirmForm />
    </Modal>
  </div>
);

const mapStateToProps = state => get(state, 'views.dashboard', {});

export default connect(mapStateToProps)(Dashboard);
