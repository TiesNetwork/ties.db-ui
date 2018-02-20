import classNames from 'classnames';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Link, matchPath } from 'react-router-dom';

import Progress from 'components/Progress';

import styles from './TableSelector.scss'

const TablespacesTableSelector = ({ id, name, progress, selected, to }) => {
  const className = classNames(styles.Root, {
    [styles.RootSelected]: selected,
  });

  return (
    <Link className={className} to={to}>
      <div className={styles.Name}>
        {name}
      </div>

      <div className={styles.Hash}>
        0X{id}
      </div>

      {progress && (
        <div className={styles.Progress}>
          <Progress />
        </div>
      )}
    </Link>
  );
};

const mapStateToProps = ({ entities, router, services }, { id }) => {
  const pathname = get(router, 'location.pathname', '');
  const progress = get(services, `background.${id}`);
  const table = get(entities, `tables.${id}`, {});

  const match = matchPath(pathname, '/:tablespaceId/:tableId?');

  const tableId = get(match, 'params.tableId', '');
  const tablespaceId = get(match, 'params.tablespaceId', '');

  return {
    ...table, progress,
    selected: tableId === id,
    to: `/${tablespaceId}/${id}`,
  };
};

export default connect(mapStateToProps)(TablespacesTableSelector);
