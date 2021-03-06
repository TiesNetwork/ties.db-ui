import classNames from 'classnames';
import { get } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, matchPath } from 'react-router-dom';

/** Actions **/
import { fetchTable } from '../ducks/actions';

/** Entities **/
import {
  getTransactionByLink,

  /** Transactions types **/
  CONFIRMATION,
  ERROR,
  FAIL,
  PENDING,
 } from 'entities/models/transactions';

/** Components **/
import Label from 'components/Label';
import Progress from 'components/Progress';

import styles from './TableSelector.scss'

class TablespacesTableSelector extends Component {
  componentDidMount() {
    const { fetchTable, name } = this.props;
    name === undefined && fetchTable();
  }

  render() {
    const { 
      distributed,
      hash,
      name,
      selected,
      to,
      transaction,
    } = this.props;

    const className = classNames(styles.Root, {
      [styles.RootEmpty]: !name,
      [styles.RootLoading]: !!transaction,
      [styles.RootSelected]: selected,
    });

    // @todo - transaction wrapper;

    return (
      <Link className={className} to={to}>
        {distributed && (
          <div className={styles.Distributed}>
            Distributed
          </div>
        )}

        <div className={styles.Name}>
          {name}
        </div>

        <div className={styles.Hash}>
          {hash}
        </div>

        {transaction && (
          <div className={styles.Progress}>
            <Progress
              value={transaction.block / 24 * 100}
              variant={
                transaction.status === PENDING
                  ? Progress.VARIANT.SECONDARY
                  : transaction.status === CONFIRMATION
                    ? Progress.VARIANT.PRIMARY
                    : transaction.status === FAIL || transaction.status === ERROR
                      ? Progress.VARIANT.DANGER
                      : Progress.VARIANT.SUCCESS
              }
            />
          </div>
        )}

        {false && (
          <Label
            className={styles.Published}
            variant={Label.VARIANT.SUCCESS}
          >
            DISTRIBUTED
          </Label>
        )}
      </Link>
    );
  }
}

const mapStateToProps = ({ entities, router, services }, { hash }) => {
  const pathname = get(router, 'location.pathname', '');
  const progress = get(services, `background.${hash}`);
  const table = get(entities, `tables.${hash}`, {});
  const transaction = getTransactionByLink(entities, `tables.${hash}`);

  const match = matchPath(pathname, '/schemas/:tablespaceHash/:tableHash?');

  const tableHash = get(match, 'params.tableHash', '');
  const tablespaceHash = get(match, 'params.tablespaceHash', '');

  return {
    ...table, progress, transaction,
    selected: tableHash === hash,
    to: `/schemas/${tablespaceHash}/${hash}`,
  };
};

const mapDispatchToProps = (dispatch, { hash }) => ({
  fetchTable: () => dispatch(fetchTable(hash)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TablespacesTableSelector);
