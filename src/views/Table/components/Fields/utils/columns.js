import React from 'react'

/** Actions **/
import { fetchField } from '../../../ducks/actions';

import { Cell, DataFetcher, Name } from 'components/Table/index';

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
    Cell: ({ value }) => <Cell value={value} />,
    id: 'default',
    Header: 'Default',
    sortable: false,
  },
]
