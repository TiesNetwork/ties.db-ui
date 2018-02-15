import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './TablespaceSelector.scss';

const DashboardTablespaceSelector = ({ id, name }) => (
  <div className={styles.Root}>
    <Link className={styles.Link} to={`/${id}`}>
      <div className={styles.Name}>
        {name.substr(0, 1)}
      </div>

      <div className={styles.Tooltip}>
        {name}
      </div>
    </Link>
  </div>
);

const mapStateToProps = (state, { id }) => get(state, `entities.tablespaces.${id}`, {});

export default connect(mapStateToProps)(DashboardTablespaceSelector);
