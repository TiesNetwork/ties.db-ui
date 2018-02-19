import React from 'react'

import { Name } from '../../../../components/Table';

export default [
  {
    accessor: 'name',
    Cell: ({ value }) => <Name {...value} />,
    id: 'name',
    Header: 'Name',
    sortable: true,
  },
  {
    accessor: 'fields',
    id: 'fields',
    Header: 'Fields',
    sortable: false,
  },
]