import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

// Actions
import { openModal } from 'services/modals';
import { setCurrentAccount } from 'services/session';

// Components
import Button from 'components/Button';
import Account from '../components/Account';

import styles from './Accounts.scss';

const SettingsAccounts = ({
  accounts,
  currentAccount,
  handleAccountClick,
  handleImportClick,
}) => (
  <div className={styles.Root}>
    <div className={styles.Header}>
      <div className={styles.Title}>
        Accounts
      </div>

      <div className={styles.Actions}>
        <Button onClick={handleImportClick}>
          Import account from JSON
        </Button>
      </div>
    </div>

    <div className={styles.Container}>
      {accounts && accounts.length > 0 && (
        <div className={styles.List}>
          {accounts.map(account => (
            <Account {...account}
              key={account.id}
              isCurrent={account.address === currentAccount}
              onClick={handleAccountClick}
            />
          ))}
        </div>
      )}
    </div>
  </div>
);

const mapStateToProps = ({ services }) => ({
  accounts: get(services, 'session.accounts', []),
  currentAccount: get(services, 'session.currentAccount'),
});

const mapDispatchToProps = dispatch => ({
  openModal: () => dispatch(openModal('importAccount')),
  setCurrentAccount: address => dispatch(setCurrentAccount(address)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    handleAccountClick: ({ setCurrentAccount }) => address =>
      setCurrentAccount && setCurrentAccount(address),
    handleImportClick: ({ openModal }) => () =>
      openModal && openModal(),
  })
)(SettingsAccounts);
