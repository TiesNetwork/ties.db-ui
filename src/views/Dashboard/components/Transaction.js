import PropTypes from 'prop-types';
import React from 'react';

/** Components **/
import Icon from 'components/Icon';
import Progress from 'components/Progress';

import styles from './Transaction.scss';

const DashboardTransaction = ({
  action,
  hash,
  name,
}) => (
  <div className={styles.Root}>
    <div className={styles.Container}>
      <div className={styles.Action}>
        {action}
      </div>

      <div className={styles.Name}>
        &laquo;{name}&raquo;
      </div>

      <div className={styles.Hash}>
        <a
          className={styles.Link}
          href={`https://rinkeby.etherscan.io/tx/${hash}`}
          target="_blank"
        >
          <Icon
            className={styles.LinkIcon}
            type={Icon.TYPE.EXTERNAL}
          />

          {hash}
        </a>
      </div>
    </div>

    <div className={styles.Progress}>
      <Progress />
    </div>
  </div>
)

DashboardTransaction.propTypes = {
  action: PropTypes.string,
  hash: PropTypes.string,
  name: PropTypes.string,
};

export default DashboardTransaction;
