import classNames from 'classnames';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

/** Actions **/
import { openModal } from 'services/modals';

/** Types **/
import { TRIGGER_FORM_ID } from '../ducks/types';

import styles from './Item.scss';

class TriggersItem extends Component {
  componentDidMount() {
    const { hash, name, onFetch } = this.props;
    !name && onFetch && onFetch(hash);
  }

  render() {
    const { className: classNameProp, handleClick, name } = this.props;

    const className = classNames(classNameProp, styles.Root, {
      [styles.RootEmpty]: !name,
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
const mapDispatchToProps = (dispatch, { hash }) => ({
  handleClick: () => dispatch(openModal(TRIGGER_FORM_ID, { hash, title: 'Update a trigger' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(TriggersItem);
