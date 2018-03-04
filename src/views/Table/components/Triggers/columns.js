import React from 'react';

/** Actions **/
import { fetchTrigger } from '../../ducks/actions';

/** Components **/
import { DataFetcher } from 'components/Table';

export default [
  {
    accessor: 'data',
    Cell: ({ value }) => <DataFetcher {...value} onFetch={fetchTrigger} />,
    id: 'data',
    Header: '',
    maxWidth: 0,
    sortable: false,
    style: { display: 'none', padding: 0 },
  },
  {
    accessor: 'name',
    id: 'name',
    Header: 'Name',
    sortable: false,
  },
  {
    accessor: 'payload',
    id: 'payload',
    Header: 'Payload',
    sortable: false,
  },
]
