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
    accessor: 'defaultValue',
    id: 'default',
    Header: 'Default',
    sortable: false,
  },
]
