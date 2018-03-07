import React from 'react';

/** Actions **/
import { fetchTrigger } from '../../../ducks/actions';

/** Components **/
import { Cell, DataFetcher } from 'components/Table/index';

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
    Cell: ({ value }) => <Cell value={value} />,
    id: 'name',
    Header: 'Name',
    sortable: false,
  },
  {
    accessor: 'payload',
    Cell: ({ value }) => <Cell value={value} />,
    id: 'payload',
    Header: 'Payload',
    sortable: false,
  },
]
