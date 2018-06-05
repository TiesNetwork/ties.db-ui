import { get, reverse, values } from 'lodash';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

/** Actions **/
import {
  createTablespace,
  deleteTablespace,
  fetchTablespaces,
} from './ducks/actions';

/** Components **/
import Modal from 'components/Modal';

import TablespaceForm from './components/TablespaceForm';
import TablespaceSelector from './components/TablespaceSelector/TablespaceSelector';
import TablespaceTrigger from './components/TablespaceTrigger';
import ThemeToggle from './components/ThemeToggle';
import Transaction from './components/Transaction';

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
    const {
      handleDelete,
      handleSubmit,
      match,
      tablespaces,
      transactions,
    } = this.props;

    return (
      <div className={styles.Root}>
        <div className={styles.Tablespaces}>
          <div className={styles.TablespacesList}>
            {tablespaces.map(hash => <TablespaceSelector hash={hash} key={hash} />)}
            <TablespaceTrigger />
          </div>


          <div className={styles.Theme}>
            <ThemeToggle />
          </div>
        </div>

        <div className={styles.Container}>
          <Switch>
            <Route path={`${match.url}:tablespaceHash`} component={Tablespace}/>
          </Switch>
        </div>

        {transactions && transactions.length > 0 && (
          <div className={styles.Transactions}>
            <div className={styles.TransactionsHeader}>
              Transactions
            </div>

            <div className={styles.TransactionsContainer}>
              {reverse(transactions).map(transaction => (
                <Transaction {...transaction} key={transaction.hash} />
              ))}
            </div>
          </div>
        )}

        <Modal
          description="Tablespace where you create the tables"
          id={TABLESPACE_FORM_ID}
          title="Create a tablespace"
        >
          <TablespaceForm
            onDelete={handleDelete}
            onSubmit={handleSubmit}
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ entities, views }) => {
  const transactions = values(get(entities, 'transactions', {}));
  const view = get(views, 'dashboard', {});

  return { ...view, transactions };
}

const mapDispatchToProps = dispatch => ({
  fetchTablespaces: () => dispatch(fetchTablespaces()),
  handleDelete: hash => dispatch(deleteTablespace(hash)),
  handleSubmit: values => dispatch(createTablespace(values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
