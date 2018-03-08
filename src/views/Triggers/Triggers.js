import { get } from 'lodash';
import React  from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/** Actions **/
import { fetchTrigger } from './ducks/actions';

/** Components **/
import Button from 'components/Button';
import Trigger from './components/Item';

import styles from './Triggers.scss';

const Triggers = ({ handleFetch, triggers }) => (
  <div className={styles.Root}>
    <div className={styles.Header}>
      <div className={styles.Title}>
        Triggers
      </div>

      <div className={styles.Actions}>
        <Button variant={Button.VARIANT.PRIMARY}>
          Create trigger
        </Button>
      </div>
    </div>

    <div className={styles.Container}>
      {triggers && triggers.length > 0 && (
        <div className={styles.Triggers}>
          {triggers.map(hash => (
            <Trigger
              className={styles.Trigger}
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
    triggers: get(entities, `tables.${tableHash}`, {}).triggers,
  };
};

const mapDispatchToProps = (dispatch, { match }) => {
  const tableHash = get(match, 'params.tableHash', '');

  return {
    handleFetch: hash => dispatch(fetchTrigger(tableHash, hash)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Triggers));
