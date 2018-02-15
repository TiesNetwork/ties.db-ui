import classNames from 'classnames';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Link, matchPath } from 'react-router-dom';

import styles from './TableSelector.scss'

const TablespacesTableSelector = ({ id, name, selected, to }) => {
  const className = classNames(styles.Root, {
    [styles.RootSelected]: selected,
  });

  return (
    <div className={className}>
      <Link
        className={styles.Link}
        to={to}
      >
        <div className={styles.Name}>
          {name}
        </div>

        <div className={styles.Hash}>
          {id}
        </div>
      </Link>
    </div>
  );
};

const mapStateToProps = ({ entities, router }, { id }) => {
  const pathname = get(router, 'location.pathname', '');
  const table = get(entities, `tables.${id}`, {});

  const match = matchPath(pathname, '/:tablespaceId/:tableId');
  const { params: { tableId, tablespaceId }} = match;

  return { ...table,
    selected: tableId === id,
    to: `/${tablespaceId}/${id}`,
  };
};

export default connect(mapStateToProps)(TablespacesTableSelector);
