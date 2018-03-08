import classNames from 'classnames';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Item.scss';

class TriggersItem extends Component {
  componentDidMount() {
    const { hash, name, onFetch } = this.props;
    !name && onFetch && onFetch(hash);
  }

  render() {
    const { className: classNameProp, name } = this.props;

    const className = classNames(classNameProp, styles.Root, {
      [styles.RootEmpty]: !name,
    });

    return (
      <div className={className}>
        <div className={styles.Name}>
          {name}
        </div>
      </div>
    );
  }
}

TriggersItem.propTypes = {
  hash: PropTypes.string,
  name: PropTypes.string,
  onFetch: PropTypes.func,
};

const mapStateToProps = ({ entities }, { hash }) => get(entities, `triggers.${hash}`, {});

export default connect(mapStateToProps)(TriggersItem);
