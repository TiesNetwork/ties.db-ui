import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Connection } from 'tiesdb-client';
import { compose, lifecycle, withHandlers, withState } from 'recompose';

// Actions
import {
  setColumns,
  setConnected,
  setConnection,
  setData,
  setError,
  setLoaded,
} from './ducks/actions';

// Components
import Alert from 'components/Alert';
import Table from 'components/Table';

import Form from './components/Form';

// Utils
import getColumnProps from './utils/getColumnProps';

import styles from './Query.scss';

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
        <Form disabled={isLoaded} onSubmit={handleSubmit}/>
      ) : (
        <Alert>{error}</Alert>
      )}
    </div>

    <div className={styles.Container}>
      {isConnected && !error && (
        <Table columns={columns} data={data || []} loading={isLoaded} resizable />
      )}

      {isConnected && error && (
        <div className={styles.Error}>
          <Alert>{error}</Alert>
        </div>
      )}
    </div>
  </div>
);

const mapStateToProps = ({ services, views }) => ({
  ...get(views, 'query'),
  ws: get(services, 'env.ws'),
});

const mapDispatchToProps = dispatch => ({
  setColumns: columns => dispatch(setColumns(columns)),
  setConnected: isConnected => dispatch(setConnected(isConnected)),
  setConnection: connection => dispatch(setConnection(connection)),
  setData: data => dispatch(setData(data)),
  setError: error => dispatch(setError(error)),
  setLoaded: isLoaded => dispatch(setLoaded(isLoaded)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const {
        isConnected,
        setConnected,
        setConnection,
        setError,
        ws,
      } = this.props;
      console.log(this.props);
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
  }),
  withHandlers({
    handleSubmit: ({
      connection,
      isLoaded,
      setColumns,
      setData,
      setLoaded,
      setError,
    }) => async ({ query }) => {
      if (connection && !isLoaded) {
        setLoaded(true);

        try {
          const records = await connection.recollect(query);

          if (records && records.length > 0) {
            const columns = records[0].getFields().map(({ name, type }) => getColumnProps(name, type));

            // console.log('Started columns:', columns);

            const data = records.map(record => {
              const result = {}

              columns.forEach(({ accessor }) => {
                try {
                  result[accessor] = record.getValue(accessor);
                } catch(e) {}
              });

              return result;
            });

            // console.log('Table data:', data);

            const filteredColumns = columns.filter(({ accessor }) => data.filter(item => !!item[accessor]).length > 0);

            // console.log('Filtered columns:', filteredColumns);

            setColumns(filteredColumns);
            setData(data);
          }

          setError(false);
          setLoaded(false);
        } catch (error) {
          setError(error.message);
          setLoaded(false);
        }
      }
    }
  })
)(Query);


