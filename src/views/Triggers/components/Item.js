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
      isLoading,
      name,
    } = this.props;

    const className = classNames(classNameProp, styles.Root, {
      [styles.RootEmpty]: !name,
      [styles.RootLoading]: isLoading,
    });

    return (
      <div className={className}>
        <div
          className={styles.Container}
          onClick={handleClick}
        >
          <div className={styles.Name}>
            {name}
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

TriggersItem.propTypes = {
  hash: PropTypes.string,
  name: PropTypes.string,
  onFetch: PropTypes.func,
};

const mapStateToProps = ({ entities, services }, { hash }) => {
  const trigger = get(entities, `triggers.${hash}`, {});
  const isLoading = get(services, `transactions.${hash}`, false);

  return { ...trigger, isLoading };
}
const mapDispatchToProps = (dispatch, { hash }) => ({
  handleClick: () => dispatch(openModal(TRIGGER_FORM_ID, { hash, title: 'Update a trigger' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(TriggersItem);
