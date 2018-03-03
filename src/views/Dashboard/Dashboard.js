import { get } from 'lodash';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

/** Actions **/
import { fetchTablespaces } from './ducks/actions';

/** Components **/
import Modal from 'components/Modal';

import TablespaceForm from './components/TablespaceForm';
import TablespaceSelector from './components/TablespaceSelector';
import TablespaceTrigger from './components/TablespaceTrigger';

/** Types **/
import {
  TABLESPACE_FORM_ID
} from './ducks/types';

/** Views **/
import Tablespace from '../Tablespace';

import styles from './Dashboard.scss';

class Dashboard extends Component {
  componentDidMount() {
    const { fetchTablespaces } = this.props;
    fetchTablespaces();
  }

  render() {
    const { match, tablespaces } = this.props;

    return (
      <div className={styles.Root}>
        <div className={styles.Tablespaces}>
          {tablespaces.map(hash => <TablespaceSelector hash={hash} key={hash} />)}

          <TablespaceTrigger />
        </div>

        <div className={styles.Container}>
          <Switch>
            <Route path={`${match.url}:tablespaceHash`} component={Tablespace}/>
          </Switch>
        </div>

        <Modal
          description="Tablespace where you create the tables"
          id={TABLESPACE_FORM_ID}
          title="Create a tablespace"
        >
          <TablespaceForm />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => get(state, 'views.dashboard', {});
const mapDispatchToProps = dispatch => ({
  fetchTablespaces: () => dispatch(fetchTablespaces()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
