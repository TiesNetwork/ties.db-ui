import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Connection } from 'tiesdb-client';
import { compose, lifecycle, withHandlers, withState } from 'recompose';

// Components
import Table from 'components/Table';

import Form from './components/Form';

import styles from './Query.scss';

const Query = ({
  columns,
  data,
  handleSubmit,
}) => (
  <div className={styles.Root}>
    <div className={styles.Container}>
      <Table columns={columns} data={data} />
    </div>

    <div className={styles.Form}>
      <Form onSubmit={handleSubmit} />
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
  withState('connection', 'setConnection', false),
  withState('isConnected', 'setConnected', false),
  withState('isLoaded', 'setLoaded', false),
  lifecycle({
    componentDidMount() {
      const {
        isConnected,
        setConnected,
        setConnection,
        ws,
      } = this.props;

      if (!isConnected && ws) {
        const connection = new Connection();
        connection.connect('ws://localhost:8080/websocket').then(({ connected }) => {
          !!connected && setConnected(true);
          !!connected && setConnection(connection);
        });
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
    }) => ({ query }) => {
      if (connection && !isLoaded) {
        setLoaded(true);

        connection.recollect(query).then(records => {
          console.log(records);
          if (records && records.length > 0) {
            const columns = records[0].getFields().map(({ name }) => ({
              accessor: name,
              Cell: ({ value }) => <span title={value}>{value.toString()}</span>,
              Header: name,
              maxWidth: 400,
            }));

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
        });
      }
    }
  })
)(Query);


