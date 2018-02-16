import React from 'react';
import { connect } from 'react-redux';

/** Actions **/
import { openModal } from '../../../services/modals';

/** Types **/
import { TABLESPACE_FORM_ID } from '../ducks/types';

import styles from './TablespaceTrigger.scss';

const TablespaceTrigger = ({ handleClick }) => (
  <button
    className={styles.Root}
    onClick={handleClick}
  />
);

const mapDispatchToProps = dispatch => ({
  handleClick: () => dispatch(openModal(TABLESPACE_FORM_ID))
});

export default connect(null, mapDispatchToProps)(TablespaceTrigger);
