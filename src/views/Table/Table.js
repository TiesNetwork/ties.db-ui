import classNames from 'classnames';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

/** Actions **/
import { openModal } from 'services/modals';

/** Components **/
import Button from 'components/Button';
import Icon from 'components/Icon';

/** Types **/
import { TABLE_FORM_ID } from 'views/Tablespace/ducks/types';

/** Views **/
import Fields from 'views/Fields';
import Indexes from 'views/Indexes';
import Triggers from 'views/Triggers';

import styles from './Table.scss';

const Table = ({ handleSettingsClick, hash, name }) => {
  const className = classNames(styles.Root, {
    [styles.RootEmpty]: !name,
  });

  return (
    <div className={className}>
      <div className={styles.Header}>
        <div className={styles.Name}>
          {name}
        </div>

        <div className={styles.Actions}>
          <Button
            onClick={handleSettingsClick}
            size={Button.SIZE.ICON}
            variant={Button.VARIANT.ICON}
          >
            <Icon type={Icon.TYPE.SETTINGS} />
          </Button>
        </div>
      </div>

      <div className={styles.Container}>
        <div className={styles.Fields}>
          <Fields />
        </div>

        <div className={styles.Extra}>
          <div className={styles.Indexes}>
            <Indexes />
          </div>

          <div className={styles.Triggers}>
            <Triggers />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ entities }, { match }) => {
  const hash = get(match, 'params.tableHash');
  return { hash, ...get(entities, `tables.${hash}`)};
};

const mapDispatchToProps = (dispatch, { match }) => {
  const hash = get(match, 'params.tableHash');
  return ({
    handleSettingsClick: () => dispatch(openModal(TABLE_FORM_ID, { hash, title: 'Update a table' }))
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
