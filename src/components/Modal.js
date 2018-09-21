import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Portal } from 'react-portal';
import { connect } from 'react-redux';

/** Actions **/
import { closeModal } from '../services/modals';

/** Components **/
import Icon from './Icon';

import styles from './Modal.scss';

const Modal = ({
  children,
  description,
  handleClose,
  isOpened,
  props,
  title,
}) => isOpened && (
  <Portal onClose={handleClose}>
    <div className={styles.Root}>
      <button
        className={styles.Close}
        onClick={handleClose}
      >
        <Icon
          className={styles.CloseIcon}
          type={Icon.TYPE.CLOSE}
        />
      </button>

      <div className={styles.Container}>
        <div className={styles.Header}>
          {title && (
            <div className={styles.Title}>
              {title}
            </div>
          )}

          {description && (
            <div className={styles.Description}>
              {description}
            </div>
          )}
        </div>

        <div className={styles.Content}>
          {typeof children === 'function' ? children(props) : children}
        </div>
      </div>
    </div>
  </Portal>
);

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]),
  description: PropTypes.string,
  title: PropTypes.string,
};

const mapStateToProps = (state, { id }) => {
  const modal = get(state, `services.modals.${id}`);

  return {
    ...modal,
    isOpened: !!modal
  };
};

const mapDispatchToProps = (dispatch, { id }) => ({
  handleClose: () => dispatch(closeModal(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
