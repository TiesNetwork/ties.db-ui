import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

/** Components **/
import TableForm from './components/TableForm';
import TableSelector from './components/TableSelector';
import TableTrigger from './components/TableTrigger';
import Modal from 'components/Modal';
import Tabs, { Tab } from 'components/Tabs';

/** Types **/
import { TABLE_FORM_ID } from './ducks/types';

/** Views **/
import Table from '../Table';

import styles from './Tablespace.scss';

const Tablespace = ({ id, match, name, tables }) => (
  <div className={styles.Root}>
    <div className={styles.Header}>
      <div className={styles.Name}>
          {name}

        <span className={styles.Id}>
          0X{id}
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
        {tables && tables.length > 0 && (
          <div className={styles.TablesContainer}>
            {tables.map(id => (
              <TableSelector id={id} key={id} />
            ))}

            <TableTrigger />
          </div>
        )}
      </div>

      <div className={styles.Content}>
        <Switch>
          <Route path={`${match.url}/:tableId`} component={Table} />
        </Switch>
      </div>
    </div>

    <Modal id={TABLE_FORM_ID} title="Create a table">
      <TableForm initialValues={{ tablespaceId: id }}/>
    </Modal>
  </div>
);

const mapStateToProps = (state, { match }) => {
  const id = get(match, 'params.tablespaceId', 0);
  return get(state, `entities.tablespaces.${id}`, {});
};

export default connect(mapStateToProps)(Tablespace);
