import classNames from 'classnames';
import { get } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, matchPath } from 'react-router-dom';

/** Actions **/
import { fetchTable } from '../ducks/actions';

/** Components **/
import Progress from 'components/Progress';

import styles from './TableSelector.scss'

class TablespacesTableSelector extends Component {
  componentDidMount() {
    const { fetchTable, name } = this.props;
    name === undefined && fetchTable();
  }

  render() {
    const { hash, isLoading, name, selected, to } = this.props;

    const className = classNames(styles.Root, {
      [styles.RootEmpty]: !name,
      [styles.RootLoading]: isLoading,
      [styles.RootSelected]: selected,
    });

    return (
      <Link className={className} to={to}>
        <div className={styles.Name}>
          {name}
        </div>

        <div className={styles.Hash}>
          {hash}
        </div>

        {isLoading && (
          <div className={styles.Progress}>
            <Progress />
          </div>
        )}
      </Link>
    );
  }
}

const mapStateToProps = ({ entities, router, services }, { hash }) => {
  const isLoading = get(services, `transactions.${hash}`, false);
  const pathname = get(router, 'location.pathname', '');
  const progress = get(services, `background.${hash}`);
  const table = get(entities, `tables.${hash}`, {});

  const match = matchPath(pathname, '/:tablespaceHash/:tableHash?');

  const tableHash = get(match, 'params.tableHash', '');
  const tablespaceHash = get(match, 'params.tablespaceHash', '');

  return {
    ...table, isLoading, progress,
    selected: tableHash === hash,
    to: `/${tablespaceHash}/${hash}`,
  };
};

const mapDispatchToProps = (dispatch, { hash }) => ({
  fetchTable: () => dispatch(fetchTable(hash)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TablespacesTableSelector);
