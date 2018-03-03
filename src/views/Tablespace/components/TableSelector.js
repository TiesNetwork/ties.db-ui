import classNames from 'classnames';
import { get } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, matchPath } from 'react-router-dom';

/** Actions **/
import { fetchTable } from '../ducks/actions';

import styles from './TableSelector.scss'

class TablespacesTableSelector extends Component {
  componentDidMount() {
    const { fetchTable, name } = this.props;
    name === undefined && fetchTable();
  }

  render() {
    const { hash, name, selected, to } = this.props;

    const className = classNames(styles.Root, {
      [styles.RootSelected]: selected,
    });

    return (
      <Link className={className} to={to}>
        <div className={styles.Name}>
          {name || 'Loading...'}
        </div>

        <div className={styles.Hash}>
          {hash}
        </div>
      </Link>
    );
  }
}

const mapStateToProps = ({ entities, router, services }, { hash }) => {
  const pathname = get(router, 'location.pathname', '');
  const progress = get(services, `background.${hash}`);
  const table = get(entities, `tables.${hash}`, {});

  const match = matchPath(pathname, '/:tablespaceHash/:tableHash?');

  const tableHash = get(match, 'params.tableHash', '');
  const tablespaceHash = get(match, 'params.tablespaceHash', '');

  return {
    ...table, progress,
    selected: tableHash === hash,
    to: `/${tablespaceHash}/${hash}`,
  };
};

const mapDispatchToProps = (dispatch, { hash }) => ({
  fetchTable: () => dispatch(fetchTable(hash)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TablespacesTableSelector);
