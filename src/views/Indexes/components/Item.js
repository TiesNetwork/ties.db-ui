import classNames from 'classnames';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Item.scss';

const TYPE = {
  EXTERNAL: 'external',
  INTERNAL: 'internal',
  PRIMARY: 'primary',
};

class IndexesItem extends Component {
  componentDidMount() {
    const { hash, name, onFetch } = this.props;
    !name && onFetch && onFetch(hash);
  }

  render() {
    const { className: classNameProp, fields, name, type } = this.props;

    const className = classNames(classNameProp, styles.Root, {
      [styles.RootEmpty]: !name,
    });

    const iconClassName = classNames(styles.Icon, {
      [styles.IconExternal]: type === TYPE.EXTERNAL,
      [styles.IconInternal]: type === TYPE.INTERNAL,
      [styles.IconPrimary]:  type === TYPE.PRIMARY,
    });

    return (
      <div className={className}>
        <div className={iconClassName}>
          {type && type.substr(0, 1)}
        </div>

        <div className={styles.Info}>
          <div className={styles.Name}>
            {name}
          </div>

          <div className={styles.Type}>
            {type}
          </div>
        </div>

        <div className={styles.Fields}>
          {fields && fields.map((field, index) => (
            <div className={styles.Field} key={index}>
              {field}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

IndexesItem.propTypes = {
  fields: PropTypes.array,
  hash: PropTypes.string,
  name: PropTypes.string,
  onFetch: PropTypes.func,
  type: PropTypes.string,
};

IndexesItem.TYPE = TYPE;

const mapStateToProps = ({ entities }, { hash }) => {
  const { fields, ...index } = get(entities, `indexes.${hash}`, {});

  return {
    ...index,
    fields: fields && fields.map(hash => get(entities, `fields.${hash}`, {}).name),
  };
}

export default connect(mapStateToProps)(IndexesItem);
