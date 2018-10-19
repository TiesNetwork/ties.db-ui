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
import { FIELD_FORM_ID } from '../ducks/types';

import styles from './Item.scss';

const TYPE = {
  BAG: 'Bag',
  BINARY: 'Binary',
  BOOLEAN: 'Boolean',
  DECIMAL: 'Decimal',
  DOUBLE: 'Double',
  DURATION: 'Duration',
  FLOAT: 'Float',
  INTEGER: 'Integer',
  LIST: 'List',
  LONG: 'Long',
  MAP: 'Map',
  STRING: 'String',
  STRUCTURE: 'Structure',
  TIME: 'Time',
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
      [styles.IconBag]: type === TYPE.BAG,
      [styles.IconBinary]: type === TYPE.BINARY,
      [styles.IconBoolean]: type === TYPE.BOOLEAN,
      [styles.IconDecimal]: type === TYPE.DECIMAL,
      [styles.IconDouble]: type === TYPE.DOUBLE,
      [styles.IconDuration]: type === TYPE.DURATION,
      [styles.IconFloat]: type === TYPE.FLOAT,
      [styles.IconInteger]: type === TYPE.INTEGER,
      [styles.IconList]: type === TYPE.LIST,
      [styles.IconLong]: type === TYPE.LONG,
      [styles.IconMap]: type === TYPE.MAP,
      [styles.IconString]: type === TYPE.STRING,
      [styles.IconStructure]: type === TYPE.STRUCTURE,
      [styles.IconTime]: type === TYPE.TIME,
    });

    const isLoading = transaction && (
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
            {type && type.replace(/[aeiou]/g, '').substr(0, 2)}
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
            Default: {(defaultValue || 0).toString()}
          </div>

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

FieldsItem.propTypes = {
  defaultValue: PropTypes.oneOfType([
    PropTypes.boolean,
    PropTypes.number,
    PropTypes.string,
  ]),
  hash: PropTypes.string,
  name: PropTypes.string,
  onFetch: PropTypes.func,
  readOnly: PropTypes.bool,
  type: PropTypes.string,
};

FieldsItem.TYPE = TYPE;

const mapStateToProps = ({ entities, services }, { hash }) => {
  const field = get(entities, `fields.${hash}`, {});
  const transaction = getTransactionByLink(entities, `fields.${hash}`);

  return {
    ...field,
    transaction: transaction && transaction.status !== SUCCESS ? transaction : null,
  };
};

const mapDispatchToProps = (dispatch, { hash }) => ({
  handleClick: () => dispatch(openModal(FIELD_FORM_ID, { hash, title: 'Update a field' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(FieldsItem);
