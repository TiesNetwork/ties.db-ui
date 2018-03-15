import classNames from 'classnames';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, matchPath } from 'react-router-dom';

/** Actions **/
import { fetchTablespace } from '../../ducks/actions';

import styles from './TablespaceSelector.scss';

class DashboardTablespaceSelector extends Component {
  componentDidMount() {
    const { fetchTablespace, name } = this.props;
    name === undefined && fetchTablespace();
  }

  render() {
    const {
      hash,
      isLoading,
      name,
      selected,
    } = this.props;

    const className = classNames(styles.Root, {
      [styles.RootEmpty]: !name,
      [styles.RootLoading]: isLoading,
      [styles.RootSelected]: name && selected,
    });

    return (
      <Link className={className} to={`/${hash}`}>
        <div className={styles.Name}>
          {(name || '?').substr(0, 1)}
        </div>

        <div className={styles.Tooltip}>
          {name}
        </div>
      </Link>
    )
  }
}

DashboardTablespaceSelector.propTypes = {
  hash: PropTypes.string,
  name: PropTypes.string,
  selected: PropTypes.bool,
};

const mapStateToProps = ({ entities, router, services }, { hash }) => {
  const isLoading = get(services, `transactions.${hash}`, false);
  const pathname = get(router, 'location.pathname', '');
  const tablespace = get(entities, `tablespaces.${hash}`, {});

  const match = matchPath(pathname, '/:tablespaceHash');
  const tablespaceHash = get(match, 'params.tablespaceHash', '');

  return {
    ...tablespace, isLoading,
    selected: tablespaceHash === hash,
  }
};

const dispatchToProps = (dispatch, { hash }) => ({
  fetchTablespace: () => dispatch(fetchTablespace(hash)),
});

export default connect(mapStateToProps, dispatchToProps)(DashboardTablespaceSelector);
