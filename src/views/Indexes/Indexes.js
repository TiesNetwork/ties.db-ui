import { get } from 'lodash';
import React  from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/** Actions **/
import { fetchIndex } from './ducks/actions';

/** Components **/
import Index from './components/Item';

import styles from './Indexes.scss';

const Indexes = ({ handleFetch, indexes }) => (
  <div className={styles.Root}>
    <div className={styles.Header}>
      <div className={styles.Title}>
        Indexes
      </div>
    </div>

    <div className={styles.Container}>
      {indexes && indexes.length > 0 && (
        <div className={styles.Indexes}>
          {indexes.map(hash => (
            <Index
              className={styles.Index}
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
    indexes: get(entities, `tables.${tableHash}`, {}).indexes,
  };
};

const mapDispatchToProps = (dispatch, { match }) => {
  const tableHash = get(match, 'params.tableHash', '');

  return {
    handleFetch: hash => dispatch(fetchIndex(tableHash, hash)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Indexes));
