import classNames from 'classnames';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

/** Actions **/
import { openModal } from 'services/modals';
import { createTable, deleteTable } from './ducks/actions';

/** Components **/
import Button from 'components/Button';
import Icon from 'components/Icon';
import Modal from 'components/Modal';

import TableForm from './components/TableForm';
import TableSelector from './components/TableSelector';
import TableTrigger from './components/TableTrigger';

/** Types **/
import { TABLE_FORM_ID } from './ducks/types';
import { TABLESPACE_FORM_ID } from 'views/Dashboard/ducks/types';

/** Views **/
import Table from '../Table';

import styles from './Tablespace.scss';

const Tablespace = ({
  handleDelete,
  handleSettingsClick,
  handleSubmit,
  hash,
  match,
  name,
  tables,
}) => {
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

            <div className={styles.Actions}>
              <Button
                onClick={handleSettingsClick}
                size={Button.SIZE.ICON}
                variant={Button.VARIANT.ICON}
              >
                <Icon type={Icon.TYPE.SETTINGS} />
              </Button>
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
        <TableForm
          onDelete={handleDelete}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
};

const mapStateToProps = (state, { match }) => {
  const hash = get(match, 'params.tablespaceHash');
  return get(state, `entities.tablespaces.${hash}`, {});
};

const mapDispatchToProps = (dispatch, { match }) => {
  const tablespaceHash = get(match, 'params.tablespaceHash');

  return ({
    handleDelete: hash => dispatch(deleteTable(tablespaceHash, hash)),
    handleSettingsClick: () => dispatch(openModal(TABLESPACE_FORM_ID, { hash: tablespaceHash, title: 'Edit tablespace'})),
    handleSubmit: values => dispatch(createTable(tablespaceHash, values)),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Tablespace);
