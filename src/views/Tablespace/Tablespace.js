import classNames from 'classnames';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

/** Components **/
import TableForm from './components/TableForm';
import TableSelector from './components/TableSelector';
import TableTrigger from './components/TableTrigger';

import Modal from 'components/Modal';

/** Types **/
import { TABLE_FORM_ID } from './ducks/types';

/** Views **/
import Table from '../Table';

import styles from './Tablespace.scss';

const Tablespace = ({ hash, match, name, tables }) => {
  const className = classNames(styles.Root, {
    [styles.RootEmpty]: !name,
  });

  return (
    <div className={className}>
      <div className={styles.Container}>
        <div className={styles.Sidebar}>
          <div className={styles.Header}>
            <div className={styles.Name}>
              {name}
            </div>
          </div>

          <div className={styles.Tables}>
            {tables && tables.length > 0 && tables.map(hash => (
              <TableSelector hash={hash} key={hash} />
            ))}

            <TableTrigger />
          </div>
        </div>

        <div className={styles.Content}>
          <Switch>
            <Route path={`${match.url}/:tableHash`} component={Table} />
          </Switch>
        </div>
      </div>

      <Modal id={TABLE_FORM_ID} title="Create a table">
        <TableForm initialValues={{ tablespaceHash: hash }}/>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state, { match }) => {
  const hash = get(match, 'params.tablespaceHash', 0);
  return get(state, `entities.tablespaces.${hash}`, {});
};

export default connect(mapStateToProps)(Tablespace);
