import React from 'react'

import { Name } from '../../../../components/Table';

export default [
  {
    accessor: 'name',
    id: 'name',
    Header: 'Name',
    sortable: true,
  },
  {
    accessor: 'payload',
    id: 'payload',
    Header: 'Payload',
    sortable: false,
  },
]
