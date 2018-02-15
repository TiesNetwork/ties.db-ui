import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Link, matchPath } from 'react-router-dom';

import styles from './TablespaceSelector.scss';
import classNames from "classnames";

const DashboardTablespaceSelector = ({ id, name, selected }) => {
  const className = classNames(styles.Root, {
    [styles.RootSelected]: selected,
  });

  return (
    <Link className={className} to={`/${id}`}>
      <div className={styles.Name}>
        {name.substr(0, 1)}
      </div>

      <div className={styles.Tooltip}>
        {name}
      </div>
    </Link>
  );
};

const mapStateToProps = ({ entities, router }, { id }) => {
  const pathname = get(router, 'location.pathname', '');
  const tablespace = get(entities, `tablespaces.${id}`, {});

  const match = matchPath(pathname, '/:tablespaceId');
  const tablespaceId = get(match, 'params.tablespaceId', '');

  return {
    ...tablespace,
    selected: tablespaceId === id,
  }
};

export default connect(mapStateToProps)(DashboardTablespaceSelector);
