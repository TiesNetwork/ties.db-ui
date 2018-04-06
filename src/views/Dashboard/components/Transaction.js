import PropTypes from 'prop-types';
import React from 'react';

/** Components **/
import Label from 'components/Label';
import Icon from 'components/Icon';
import Progress from 'components/Progress';

/** Types **/
import {
  CONFIRMATION,
  ERROR,
  FAIL,
  PENDING,
} from 'entities/models/transactions';

import styles from './Transaction.scss';

const DashboardTransaction = ({
  action,
  block,
  hash,
  name,
  status,
}) => {
  const progress = block
    ? block / 24 * 100
    : null;

  const variant = status === PENDING
    ? Label.VARIANT.SECONDARY
    : status === CONFIRMATION
      ? Label.VARIANT.PRIMARY
      : status === FAIL || status === ERROR
        ? Label.VARIANT.DANGER
        : Label.VARIANT.SUCCESS;

  return (
    <div className={styles.Root}>
      <div className={styles.Container}>
        <div className={styles.Action}>
          {action}:
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

            <div className={styles.LinkText}>
              {hash}
            </div>
          </a>
        </div>

        <Label
          className={styles.Status}
          variant={variant}
        >
          {status}
        </Label>
      </div>

      <div className={styles.Confirmation}>
        <div className={styles.Blocks}>
          {block}/24
        </div>

        <div className={styles.Progress}>
          <Progress
            value={progress}
            variant={variant}
          />
        </div>
      </div>
    </div>
  );
}

DashboardTransaction.propTypes = {
  action: PropTypes.string,
  hash: PropTypes.string,
  name: PropTypes.string,
};

export default DashboardTransaction;
