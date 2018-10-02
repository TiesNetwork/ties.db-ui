import React, { Fragment } from 'react';

// Components
import Modal from 'components/Modal';

import ImportForm from './components/ImportForm';
import TransactionForm from './components/TransactionForm';

const Modals = () => (
  <Fragment>
    <Modal id="importAccount" title="Import account">
      {props => <ImportForm {...props} />}
    </Modal>

    <Modal id="transactionForm" title="Confirm transaction">
      {props => <TransactionForm {...props} />}
    </Modal>
  </Fragment>
);

export default Modals;
