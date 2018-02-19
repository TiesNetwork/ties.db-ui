import React from 'react';
import { connect } from 'react-redux';

/** Actions **/
import { openModal } from 'services/modals';

/** Components **/
import Button from 'components/Button';

/** Types **/
import { TABLE_FORM_ID } from '../ducks/types';

import styles from './TableTrigger.scss';

const TableTrigger = ({ handleClick }) => (
  <Button
    className={styles.Root}
    onClick={handleClick}
    size={Button.SIZE.LARGE}
    variant={Button.VARIANT.SECONDARY}
  >
    Create Table
  </Button>
);

const mapDispatchToProps = dispatch => ({
  handleClick: () => dispatch(openModal(TABLE_FORM_ID))
});

export default connect(null, mapDispatchToProps)(TableTrigger);
