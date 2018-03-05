import classNames from 'classnames';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

/** Components **/
// import TableForm from './components/TableForm';
import TableSelector from './components/TableSelector';
import TableTrigger from './components/TableTrigger';
// import Modal from 'components/Modal';
import Tabs, { Tab } from 'components/Tabs';

/** Types **/
// import { TABLE_FORM_ID } from './ducks/types';

/** Views **/
import Table from '../Table';

import styles from './Tablespace.scss';

const Tablespace = ({ hash, match, name, tables }) => {
  const className = classNames(styles.Root, {
    [styles.RootEmpty]: !name,
  });

  return (
    <div className={className}>
      <div className={styles.Header}>
        <div className={styles.Left}>
          <div className={styles.Name}>
            {name}
          </div>

          <span className={styles.Hash}>
            {hash}
          </span>
        </div>

        <div className={styles.Nav}>
          <Tabs value="Tables">
            <Tab label="Tables"  />
          </Tabs>
        </div>
      </div>

      <div className={styles.Container}>
        <div className={styles.Tables}>
          <div className={styles.TablesContainer}>
            {tables && tables.length > 0 && tables.map(hash => (
              <TableSelector hash={hash} key={hash} />
            ))}
          </div>
        </div>

        <div className={styles.Content}>
          <Switch>
            <Route path={`${match.url}/:tableHash`} component={Table} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, { match }) => {
  const hash = get(match, 'params.tablespaceHash', 0);
  return get(state, `entities.tablespaces.${hash}`, {});
};

export default connect(mapStateToProps)(Tablespace);
//
// <Modal id={TABLE_FORM_ID} title="Create a table">
//   <TableForm initialValues={{ tablespaceHash: hash }}/>
// </Modal>
