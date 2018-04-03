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
    PENDING,
} from 'entities/models/transactions';

/** Types **/
import { TRIGGER_FORM_ID } from '../ducks/types';

import styles from './Item.scss';

class TriggersItem extends Component {
  componentDidMount() {
    const { hash, name, onFetch } = this.props;
    !name && onFetch && onFetch(hash);
  }

  render() {
    const {
      className: classNameProp,
      handleClick,
      name,
      transaction,
      readOnly,
    } = this.props;

    const className = classNames(classNameProp, styles.Root, {
      [styles.RootEmpty]: !name,
      [styles.RootReadOnly]: readOnly || transaction,
    });

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
          <div className={styles.Name}>
            {name}
          </div>

          {isLoading && (
            <div className={styles.Progress}>
              <Progress
                value={transaction.block / 24 * 100}
                variant={
                  transaction.status === PENDING
                    ? Progress.VARIANT.SECONDARY
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

TriggersItem.propTypes = {
  hash: PropTypes.string,
  name: PropTypes.string,
  onFetch: PropTypes.func,
  readOnly: PropTypes.bool,
};

const mapStateToProps = ({ entities, services }, { hash }) => {
  const trigger = get(entities, `triggers.${hash}`, {});
  const transaction = getTransactionByLink(entities, `triggers.${hash}`);

  return { ...trigger, transaction };
}
const mapDispatchToProps = (dispatch, { hash }) => ({
  handleClick: () => dispatch(openModal(TRIGGER_FORM_ID, { hash, title: 'Update a trigger' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(TriggersItem);
