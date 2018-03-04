import React from 'react'

/** Actions **/
import { fetchField } from '../../ducks/actions';

import { DataFetcher, Name } from 'components/Table';

export default [
  {
    accessor: 'data',
    Cell: ({ value }) => <DataFetcher {...value} onFetch={fetchField} />,
    id: 'data',
    Header: '',
    maxWidth: 0,
    sortable: false,
    style: { padding: 0 },
  },
  {
    accessor: 'name',
    Cell: ({ value }) => <Name {...value} />,
    id: 'name',
    Header: 'Name',
    sortable: false,
  },
  {
    accessor: 'defaultValue',
    id: 'default',
    Header: 'Default',
    sortable: false,
  },
]
