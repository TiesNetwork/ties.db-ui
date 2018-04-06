import classNames from 'classnames';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

/** Actions **/
import { openModal } from 'services/modals';

/** Components **/
import Progress from 'components/Progress';

/** Entities **/
import {
    getTransactionByLink,

    /** types **/
    CONFIRMATION,
    ERROR,
    FAIL,
    PENDING,
    SUCCESS,
} from 'entities/models/transactions';

/** Types **/
import { INDEXES_FORM_ID } from '../ducks/types';

import styles from './Item.scss';

const TYPE = {
  EXTERNAL: '4',
  INTERNAL: '2',
  PRIMARY: '1',
};

class IndexesItem extends Component {
  componentDidMount() {
    const { hash, name, onFetch } = this.props;
    !name && onFetch && onFetch(hash);
  }

  render() {
    const {
      className: classNameProp,
      fields,
      handleClick,
      name,
      readOnly,
      transaction,
      type,
    } = this.props;

    const className = classNames(classNameProp, styles.Root, {
      [styles.RootEmpty]: !name,
      [styles.RootReadOnly]: readOnly || transaction,
    });

    const iconClassName = classNames(styles.Icon, {
      [styles.IconExternal]: type === TYPE.EXTERNAL,
      [styles.IconInternal]: type === TYPE.INTERNAL,
      [styles.IconPrimary]:  type === TYPE.PRIMARY,
    });

    const displayType = type === TYPE.PRIMARY
      ? 'Primary'
      : type === TYPE.EXTERNAL
        ? 'External'
        : 'Internal';

    const isLoading =
      transaction && (
        transaction.status === CONFIRMATION ||
        transaction.status === PENDING
      );

    return (
      <div className={className}>
        <div
          className={styles.Container}
          onClick={!readOnly ? handleClick : undefined}
        >
          <div className={iconClassName}>
            {displayType.substr(0, 1)}
          </div>

          <div className={styles.Info}>
            <div className={styles.Name}>
              {name}
            </div>

            <div className={styles.Type}>
              {displayType}
            </div>
          </div>

          {!isLoading && (
            <div className={styles.Fields}>
              {fields && fields.map((field, index) => (
                <div className={styles.Field} key={index}>
                  {field}
                </div>
              ))}
            </div>
          )}

          {isLoading && (
            <div className={styles.Progress}>
              <Progress
                value={transaction.block / 24 * 100}
                variant={
                  transaction.status === PENDING
                    ? Progress.VARIANT.SECONDARY
                    : transaction.status === CONFIRMATION
                      ? Progress.VARIANT.PRIMARY
                      : transaction.status === FAIL || transaction.status === ERROR
                        ? Progress.VARIANT.DANGER
                        : Progress.VARIANT.SUCCESS
                }
              />
            </div>
          )}
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
  readOnly: PropTypes.bool,
  type: PropTypes.string,
};

IndexesItem.TYPE = TYPE;

const mapStateToProps = ({ entities, services }, { hash }) => {
  const { fields, ...index } = get(entities, `indexes.${hash}`, {});
  const transaction = getTransactionByLink(entities, `indexes.${hash}`);

  return {
    ...index,
    fields: fields && fields.map(hash => get(entities, `fields.${hash}`, {}).name),
    transaction: transaction && transaction.status !== SUCCESS ? transaction : null,
  };
};

const mapDispatchToProps = (dispatch, { hash }) => ({
  handleClick: () => dispatch(openModal(INDEXES_FORM_ID, { hash, title: 'Update a index' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexesItem);
