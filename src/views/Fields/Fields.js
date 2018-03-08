import { get } from 'lodash';
import React  from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/** Actions **/
import { fetchField } from './ducks/actions';

/** Components **/
import Field from './components/Item';

import styles from './Fields.scss';

const Fields = ({ handleFetch, fields }) => (
  <div className={styles.Root}>
    <div className={styles.Header}>
      <div className={styles.Title}>
        Fields
      </div>
    </div>

    <div className={styles.Container}>
      {fields && fields.length > 0 && (
        <div className={styles.Fields}>
          {fields.map(hash => (
            <Field
              className={styles.Field}
              hash={hash}
              key={hash}
              onFetch={handleFetch}
            />
          ))}
        </div>
      )}
    </div>
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
    handleFetch: hash => dispatch(fetchField(tableHash, hash)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Fields));
