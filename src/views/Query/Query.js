import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Connection } from 'tiesdb-client';
import { compose, lifecycle, withHandlers, withState } from 'recompose';

// Components
import Alert from 'components/Alert';
import Table from 'components/Table';

import Form from './components/Form';

// Utils
import getColumnProps from './utils/getColumnProps';

import styles from './Query.scss';

const formValue = `SELECT
  Id,
  CAST(fDuration as duration) as dur,
  CAST(writeTime(fTime) as date)::time as wtime,
  CAST(writeTime(fTime) AS date) as dt,
  fLong,
  bigIntAsBlob(toUnixTimestamp(CAST(writeTime(fTime) AS date))) AS WriteTime,
  intAsBlob(0x309) AS TestValue
FROM "client-dev.test"."all_types"`;

const Query = ({
  columns,
  data,
  error,
  handleSubmit,
  isConnected,
  isLoaded,
}) => (
  <div className={styles.Root}>
    <div className={styles.Form}>
      {isConnected ? (
        <Form disabled={isLoaded} onSubmit={handleSubmit} initialValues={{ query: formValue }} />
      ) : (
        <Alert>{error}</Alert>
      )}
    </div>

    <div className={styles.Container}>
      {isConnected && !error && data && data.length > 0 && (
        <Table columns={columns} data={data} resizable />
      )}

      {isConnected && error && (
        <div className={styles.Error}>
          <Alert>{error}</Alert>
        </div>
      )}
    </div>
  </div>
);

const mapStateToProps = ({ services }) => ({
  ws: get(services, 'env.ws'),
});

export default compose(
  connect(mapStateToProps),
  withState('columns', 'setColumns', []),
  withState('data', 'setData', []),
  withState('error', 'setError', false),
  withState('connection', 'setConnection', false),
  withState('isConnected', 'setConnected', false),
  withState('isLoaded', 'setLoaded', false),
  lifecycle({
    componentDidMount() {
      const {
        isConnected,
        setConnected,
        setConnection,
        setError,
        ws,
      } = this.props;

      if (!isConnected && ws) {
        const connection = new Connection();
        connection.connect('ws://localhost:8080/websocket')
          .then(({ connected }) => {
            !!connected && setError(null);
            !!connected && setConnected(true);
            !!connected && setConnection(connection);
          }).catch(error => setError && setError(error.message));
      }
    },
    componentWillUnmount() {
      const { connection } = this.props;
      connection && connection.close();
    },
  }),
  withHandlers({
    handleSubmit: ({
      connection,
      isLoaded,
      setColumns,
      setData,
      setLoaded,
      setError,
    }) => ({ query }) => {
      if (connection && !isLoaded) {
        setLoaded(true);

        connection.recollect(query).then(records => {
          if (records && records.length > 0) {
            const columns = records[0].getFields().map(({ name, type }) => getColumnProps(name, type));

            console.log('Started columns:', columns);

            const data = records.map(record => {
              const result = {}

              columns.forEach(({ accessor }) => {
                try {
                  result[accessor] = record.getValue(accessor);
                } catch(e) {}
              });

              return result;
            });

            console.log('Table data:', data);

            const filteredColumns = columns.filter(({ accessor }) => {
              const hasValue = data.filter(item => !!item[accessor]).length > 0;
              return hasValue;
            });

            console.log('Filtered columns:', filteredColumns);
            // console.log(data);
            // console.log(records);

            setColumns(filteredColumns);
            setData(data);
            setLoaded(false);
          }
        }).catch(error => setError(error.message));
      }
    }
  })
)(Query);


