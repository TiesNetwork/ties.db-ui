import classNames from 'classnames';
import React from 'react';
import { compose, withHandlers } from 'recompose';
import stringToColor from 'string-to-color';

import styles from './Account.scss';

const SettingsAccount = ({
  address = '',
  handleClick,
  isCurrent = false
}) => {
  const className = classNames(styles.Root, {
    [styles.RootCurrent]: !!isCurrent,
  });

  return (
    <div className={className} onClick={handleClick}>
      <div
        className={styles.Avatar}
        style={{ backgroundColor: stringToColor(address) }}
      />

      <div className={styles.Address}>
        {`0x${address}`}
      </div>
    </div>
  );
};

export default compose(
  withHandlers({
    handleClick: ({ address, onClick }) => () =>
      onClick && onClick(address),
  }),
)(SettingsAccount);
