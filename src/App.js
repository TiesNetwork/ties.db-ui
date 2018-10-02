import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import { compose, lifecycle, withHandlers } from 'recompose';
import stringToColor from 'string-to-color';

// Views
import Dashboard from './views/Dashboard';
import Modals from './views/Modals';
import Query from './views/Query';
import Settings from './views/Settings';

import styles from './App.scss';
import 'react-table/react-table.css';

const App = ({
  currentAccount,
}) => (
  <div className={styles.Root}>
    <div className={styles.Header}>
      <div className={styles.Logo}>
        <div className={styles.Title}>
          Ties.DB
        </div>

        <div className={styles.SubTitle}>
          Schema Designer
        </div>
      </div>

      <div className={styles.Nav}>
        <NavLink
          activeClassName={styles.NavItemCurrent}
          className={styles.NavItem}
          to="/schemas"
        >
          Schemas
        </NavLink>

        <NavLink
          activeClassName={styles.NavItemCurrent}
          className={styles.NavItem}
          to="/query"
        >
          Query
        </NavLink>

        <NavLink
          activeClassName={styles.NavItemCurrent}
          className={styles.NavItem}
          to="/settings"
        >
          Settings
        </NavLink>
      </div>

      <div className={styles.Account}>
        <Link to="/settings">
          <div
            className={styles.AccountAvatar}
            style={currentAccount && { backgroundColor: stringToColor(currentAccount) }}
          />
        </Link>
      </div>
    </div>

    <div className={styles.Container}>
      <Switch>
        <Route path="/query" component={Query} />
        <Route path="/schemas" component={Dashboard} />
        <Route path="/settings" component={Settings} />
        <Route path="*" render={() => <Redirect to="/schemas" />} />
      </Switch>
    </div>

    <Modals />
  </div>
);

const mapStateToProps = ({ services }) => ({
  ...get(services, 'env', {}),
  currentAccount: get(services, 'session.currentAccount'),
});

export default compose(
  connect(mapStateToProps, null, null, { pure: false }),
  withHandlers({
    setTheme: ({ theme }) => () => { document.body.setAttribute('theme', theme) },
  }),
  lifecycle({
    componentDidMount() {
      this.props.setTheme();
    },
    componentDidUpdate() {
      this.props.setTheme();
    },
  })
)(App);
