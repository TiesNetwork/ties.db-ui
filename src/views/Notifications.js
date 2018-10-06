import { get, values } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

// Components
import Alert from 'components/Alert';

import styles from './Notifications.scss';

const Notifications = ({
  notifications
}) => (
  <div className={styles.Root}>
    {notifications && notifications.length > 0 && (
      <div className={styles.List}>
        {notifications.map(({ id, text, title }) => (
          <Alert key={id} title={title}>
            {text}
          </Alert>
        ))}
      </div>
    )}
  </div>
);

const mapStateToProps = ({ services }) => ({
  notifications: values(get(services, 'notifications')),
});

export default compose(
  connect(mapStateToProps)
)(Notifications);
