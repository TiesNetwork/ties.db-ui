import { get } from 'lodash';
import React  from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/** Actions **/
import { openModal } from 'services/modals';
import {
  createField,
  deleteField,
  fetchField,
} from './ducks/actions';

/** Components **/
import Button from 'components/Button';
import Modal from 'components/Modal';

import Form from './components/Form';
import Field from './components/Item';

/** Types **/
import { FIELD_FORM_ID } from './ducks/types';

import styles from './Fields.scss';

const Fields = ({ handleClick, handleDelete, handleFetch, handleSubmit, fields }) => (
  <div className={styles.Root}>
    <div className={styles.Header}>
      <div className={styles.Title}>
        Fields
      </div>

      <div className={styles.Actions}>
        <Button
          onClick={handleClick}
          variant={Button.VARIANT.PRIMARY}
        >
          Create field
        </Button>
      </div>
    </div>

    <div className={styles.Container}>
      {fields && fields.length > 0 && (
        <div className={styles.Fields}>
          {fields.map(hash => (
            <Field
              hash={hash}
              key={hash}
              onFetch={handleFetch}
            />
          ))}
        </div>
      )}
    </div>

    <Modal id={FIELD_FORM_ID}>
      <Form
        onDelete={handleDelete}
        onSubmit={handleSubmit}
      />
    </Modal>
  </div>
);

const mapStateToProps = ({ entities }, { match }) => {
  const tableHash = get(match, 'params.tableHash', '');

  return {
    fields: get(entities, `tables.${tableHash}`, {}).fields,
  };
};

const mapDispatchToProps = (dispatch, { match }) => {
  const tableHash = get(match, 'params.tableHash', '');

  return {
    handleClick: () => dispatch(openModal(FIELD_FORM_ID, { title: 'Create a field' })),
    handleDelete: hash => dispatch(deleteField(tableHash, hash)),
    handleFetch: hash => dispatch(fetchField(tableHash, hash)),
    handleSubmit: values => dispatch(createField(tableHash, values)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Fields));
