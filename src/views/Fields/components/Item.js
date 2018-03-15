import classNames from 'classnames';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

/** Actions **/
import { openModal } from 'services/modals';

/** Components **/
import Progress from 'components/Progress';

/** Types **/
import { FIELD_FORM_ID } from '../ducks/types';

import styles from './Item.scss';

const TYPE = {
  BOOLEAN: 'boolean',
  INTEGER: 'integer',
  STRING: 'string',
};

class FieldsItem extends Component {
  componentDidMount() {
    const { hash, name, onFetch } = this.props;
    !name && onFetch && onFetch(hash);
  }

  render() {
    const {
      className: classNameProp,
      defaultValue,
      handleClick,
      isLoading,
      name,
      type
    } = this.props;

    const className = classNames(classNameProp, styles.Root, {
      [styles.RootEmpty]: !name,
      [styles.RootLoading]: isLoading,
    });

    const iconClassName = classNames(styles.Icon, {
      [styles.IconBoolean]: type === TYPE.BOOLEAN,
      [styles.IconInteger]: type === TYPE.INTEGER,
      [styles.IconString]:  type === TYPE.STRING,
    });

    return (
      <div className={className}>
        <div
          className={styles.Container}
          onClick={handleClick}
        >
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

          <div className={styles.DefaultValue}>
            Default: {defaultValue}
          </div>

          {isLoading && (
            <div className={styles.Progress}>
              <Progress />
            </div>
          )}
        </div>
      </div>
    );
  }
}

FieldsItem.propTypes = {
  defaultValue: PropTypes.string,
  hash: PropTypes.string,
  name: PropTypes.string,
  onFetch: PropTypes.func,
  type: PropTypes.string,
};

FieldsItem.TYPE = TYPE;

const mapStateToProps = ({ entities, services }, { hash }) => {
  const field = get(entities, `fields.${hash}`, {});
  const isLoading = get(services, `transactions.${hash}`, false);

  return { ...field, isLoading }
};

const mapDispatchToProps = (dispatch, { hash }) => ({
  handleClick: () => dispatch(openModal(FIELD_FORM_ID, { hash, title: 'Update a field' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(FieldsItem);
